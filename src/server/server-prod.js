import path from "path";
import express from "express";
import { WebSocketServer } from "./WebSocketServer";
import logMessage from "../js/logger";

const passport = require("passport");
const session = require("cookie-session");
require("./passport");

const DIST_DIR = __dirname;

const PORT = process.env.PORT || 3000;
const server = express()

  .use(express.static(path.join(DIST_DIR)))
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
      console.log(req.user);
      res.render("index", {
        user: req.user,
      });
    } else {
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
