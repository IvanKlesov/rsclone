import path from "path";
import express, { json } from "express";
import webpack from "webpack";
import WebSocket from "ws";
import Room from "./Room";
import serverMessageMethods from "./messages/serverMessageMethods";

import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.dev.config.js";
import logMessage from "../js/logger.js";

const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const compiler = webpack(config)
console.log(HTML_FILE);

const PORT = process.env.PORT || 3000;
const intervalValueForPing = 5000;
const rooms = [];

const server = express()
  .use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }))
  .use(webpackHotMiddleware(compiler))
  .use((req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function heartbeat(ws) {
  ws.isAlive = true;
}

const room1 = new Room("first room");
const room2 = new Room("second room");
const room3 = new Room("third room");
rooms.push(room1);
rooms.push(room2);
rooms.push(room3);

const wss = new WebSocket.Server({ server });

function parseRequestFromClient(data, ws) {
  if (data !== "") {
    const jsonData = JSON.parse(data);
    logMessage(jsonData);
    switch (jsonData.method) {
      case "message": {
        const roomID = jsonData.roomID;
        console.log(roomID);
        const curRoom = rooms.filter(room => room.id === jsonData.roomID)[0];
        serverMessageMethods.sendMessage(curRoom, ws, jsonData, WebSocket.OPEN);
        break;
      }
      case "getRooms": {
        logMessage("getRoomsMethod from client");
        logMessage("rooms: ");
        logMessage(rooms);
        serverMessageMethods.sendRooms(ws, rooms);
        break;
      }
      case "setRoom": {
        const curRoom = rooms.filter(room => room.id === jsonData.content)[0];
        curRoom.addUser(ws);
        serverMessageMethods.userRoomAccept(ws, jsonData.content);
        break;
      }
    }
  }
}

wss.on('connection', (ws) => {
  logMessage("new user");
  heartbeat(ws)
  ws.on('message', function incoming(data) {
    heartbeat(ws);
    parseRequestFromClient(data, ws);
  });
});

const pingInterval = setInterval(() => {
  wss.clients.forEach((client) => {
    if (client.isAlive === false) {
      return ws.close();
    }
    client.isAlive = false;
    client.send("p");
  });
}, intervalValueForPing);

wss.on('close', () => {
  clearInterval(pingInterval);
});
