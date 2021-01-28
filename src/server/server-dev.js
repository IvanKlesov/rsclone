import path from "path";
import express from "express";
import webpack from "webpack";

import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { WebSocketServer } from "./WebSocketServer";
import config from "../../webpack.dev.config";
import logMessage from "../js/logger";

const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, "index.html");
const compiler = webpack(config);
logMessage(HTML_FILE);

const PORT = process.env.PORT || 3000;

const server = express()
  .use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }))
  .use(webpackHotMiddleware(compiler))
  .use((req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  })
  .listen(PORT, () => logMessage(`Listening on ${PORT}`));

const wss = new WebSocketServer(server);
wss.init();
