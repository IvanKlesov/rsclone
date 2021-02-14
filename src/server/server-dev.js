import path from "path";
import express from "express";
import webpack from "webpack";

import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { WebSocketServer } from "./WebSocketServer";
import config from "../../webpack.dev.config";
import logMessage from "../js/logger";

const passport = require("passport");
const session = require("cookie-session");
require("./passport");

const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, "index.ejs");
const compiler = webpack(config);
logMessage(HTML_FILE);

const PORT = process.env.PORT || 3000;

function restoreCookie(res) {
  res.cookie("userUUID", "");
  res.cookie("userName", "");
  res.cookie("userPhotoAdress", "");
}

function storeCookie(req, res) {
  res.cookie("userUUID", req.user.id);
  res.cookie("userName", req.user.displayName);
  res.cookie("userPhotoAdress", req.user.photos[0].value);
}

const server = express()
  .use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }))
  .use(webpackHotMiddleware(compiler))

  // Configure Session Storage
  .use(session({
    name: "session-name",
    keys: ["key1", "key2"],
  }))

  // Configure Passport
  .use(passport.initialize())
  .use(passport.session())

  .set("views", path.join(DIST_DIR, ""))
  .set("view engine", "ejs")

  .get("/", (req, res) => {
    if (req.user) {
      storeCookie(req, res);

      res.render("index", {
        user: req.user,
      });
    } else {
      restoreCookie(res);

      res.render("index", {
        user: undefined,
      });
    }
  })

  // Auth Routes
  .get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))

  .get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/failed" }),
    (req, res) => {
      res.redirect("/");
    })

  .get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/");
  })

  .get("/*", (req, res) => {
    res.redirect("/");
  })

  .listen(PORT, () => logMessage(`Listening on ${PORT}`));

const wss = new WebSocketServer(server);
wss.init();
