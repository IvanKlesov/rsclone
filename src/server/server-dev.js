import path from "path";
import express from "express";
import webpack from "webpack";

import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { WebSocketServer } from "./WebSocketServer";
import config from "../../webpack.dev.config";
import logMessage from "../js/logger";

const passport = require('passport');
const session = require('cookie-session');
require('./passport');

const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, "index.ejs");
const compiler = webpack(config);
logMessage(HTML_FILE);

const PORT = process.env.PORT || 3000;

const server = express()
  .use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }))
  .use(webpackHotMiddleware(compiler))

  //Configure Session Storage
  .use(session({
    name: 'session-name',
    keys: ['key1', 'key2']
  }))

  //Configure Passport
  .use(passport.initialize())
  .use(passport.session())

  .set('views', path.join(DIST_DIR, ''))
  .set('view engine', 'ejs')

  .get('/', (req, res) => {
    if (req.user) {
      console.log(req.user);
      res.render('index', {
        user: req.user,
      })
    } else {
      res.render('index', {
        user: undefined,
      })
    }
    
  })

  // Auth Routes
  .get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


  .get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
      res.redirect('/');
    }
  )

  /* .use((req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  }) */
  .listen(PORT, () => logMessage(`Listening on ${PORT}`));

const wss = new WebSocketServer(server);
wss.init();
