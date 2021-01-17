import path from "path";
import express from "express";
import webpack from "webpack";
import WebSocket from "ws";
import Room from "./Room";
import User from "./User";
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
const users = [];


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

function findCurrentUserByWebsocket(ws) {
  return users.find(user => user.ws === ws);
}

function setCurrentUserRoom(ws, id) {
  const currentUser = findCurrentUserByWebsocket(ws);
  currentUser.setRoomID(id);
}

function destroyRoom(roomWillDestoroy) {
  roomWillDestoroy.removeAllUsers(serverMessageMethods.getOutRoomAccept);
  const destroyIndex = rooms.indexOf(roomWillDestoroy);
  if (destroyIndex > -1) {
    rooms.splice(destroyIndex, 1); 
  }
}

function findRoomLinkByRoomID(needRoomID) {
  for (let i = 0; i < rooms.length; i += 1) {
    if (needRoomID === rooms[i].id) {
      return rooms[i];
    }
  }
  return -1;
}

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
        const curRoom = findRoomLinkByRoomID(jsonData.content);
        curRoom.addUser(ws);
        if (curRoom.getRoomID()) {
          setCurrentUserRoom(ws, curRoom.getRoomID());
        }
        serverMessageMethods.userRoomAccept(ws, jsonData.content);
        break;
      }
      case "getOutRoom": {
        const curRoom = findRoomLinkByRoomID(jsonData.content);
        const itWasRoomOwner = curRoom.removeUser(ws);
        if (!itWasRoomOwner) {
          destroyRoom(curRoom);
        }
        setCurrentUserRoom(ws, undefined);
        serverMessageMethods.getOutRoomAccept(ws);
        break;
      }
      case "createRoom": {
        const newRoom = new Room(jsonData.content);
        rooms.push(newRoom);
        newRoom.setOwner(ws);
        serverMessageMethods.createRoomAccept(ws, newRoom);
        break;
      }
    }
  }
}

wss.on('connection', (ws) => {
  logMessage("new user");
  heartbeat(ws);
  users.push(new User(ws));
  ws.on('message', function incoming(data) {
    heartbeat(ws);
    parseRequestFromClient(data, ws);
  });
});

const pingInterval = setInterval(() => {
  wss.clients.forEach((client) => {
    if (client.isAlive === false) {
      if (client.roomID) {
        const curRoom = rooms.filter(room => room.id === client.roomID)[0];
        curRoom.removeUser(ws);
      }
      return client.close();
    }
    client.isAlive = false;
    client.send("p");
  });
}, intervalValueForPing);

wss.on('close', () => {
  clearInterval(pingInterval);
});
