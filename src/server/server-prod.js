import path from 'path';
import express from 'express';
import { WebSocketServer } from "./WebSocketServer";
import logMessage from "../js/logger.js";


const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static(DIST_DIR))
  .use((req, res) => res.sendFile(HTML_FILE))
  .listen(PORT, () => logMessage(`Listening on ${PORT}`));

const wss = new WebSocketServer(server);
wss.init();