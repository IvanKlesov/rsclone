import WebSocket from "ws";
import { Room } from "../js/Room";
import { User } from "../js/User";
import { serverMessageMethods } from "./messages/serverMessageMethods";
import { machiCoroHandler } from "../js/machiCoroGame/back/handlers/machiCoroHandler";
import logMessage from "../js/logger";

const intervalValueForPing = 5000;

function heartbeat(ws) {
  ws.isAlive = true;
}

export class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.rooms = [];
    this.users = [];
  }

  init() {
    this.initWssConectionHandler();
    this.initPingInterval();
    this.initWssCloseHandler();
    this.initBasicRooms();
  }

  findCurrentUserByWebsocket(ws) {
    return this.users.find((user) => user.ws === ws);
  }

  setCurrentUserRoom(ws, id) {
    const currentUser = this.findCurrentUserByWebsocket(ws);
    currentUser.setRoomID(id);
  }

  destroyRoom(roomWillDestoroy) {
    roomWillDestoroy.removeAllUsers();
    const destroyIndex = this.rooms.indexOf(roomWillDestoroy);
    if (destroyIndex > -1) {
      this.rooms.splice(destroyIndex, 1);
    }
  }

  findRoomLinkByRoomID(needRoomID) {
    for (let i = 0; i < this.rooms.length; i += 1) {
      if (needRoomID === this.rooms[i].id) {
        return this.rooms[i];
      }
    }
    return -1;
  }

  parseRequestFromClient(data, ws) {
    if (data !== "") {
      const jsonData = JSON.parse(data);
      switch (jsonData.method) {
        case "message": {
          const curRoom = this.findRoomLinkByRoomID(jsonData.roomID);
          const curUser = this.findCurrentUserByWebsocket(ws);
          serverMessageMethods.sendMessage(curRoom, curUser, jsonData, WebSocket.OPEN);
          break;
        }
        case "registerUser": {
          logMessage("find registerUser command");
          const curUser = this.findCurrentUserByWebsocket(ws);
          if (jsonData.userID) {
            curUser.setOauthID(jsonData.userID);
          }
          curUser.setUserName(jsonData.userName);
          if (jsonData.userPhotoAdress) {
            curUser.setUserPhotoAdress(jsonData.userPhotoAdress);
          }
          serverMessageMethods.registrationAccept(curUser);
          break;
        }
        case "getRooms": {
          serverMessageMethods.sendRooms(ws, this.rooms);
          break;
        }
        case "setRoom": {
          const curRoom = this.findRoomLinkByRoomID(jsonData.content);
          const curUser = this.findCurrentUserByWebsocket(ws);
          const addUserIsSuccess = curRoom.addUser(curUser);
          if (!addUserIsSuccess) {
            return serverMessageMethods.userRoomReject(ws, jsonData.content);
          }
          if (curRoom.getRoomID()) {
            curUser.setRoomID(curRoom.getRoomID());
          }
          serverMessageMethods.userRoomAccept(ws, jsonData.content, curRoom);
          serverMessageMethods.newUserInRoom(curRoom, curUser);
          break;
        }
        case "getOutRoom": {
          const curRoom = this.findRoomLinkByRoomID(jsonData.content);
          const curUser = this.findCurrentUserByWebsocket(ws);
          const itWasRoomOwner = curRoom.removeUser(curUser);
          if (!itWasRoomOwner) {
            this.destroyRoom(curRoom);
          }
          this.setCurrentUserRoom(ws, undefined);
          serverMessageMethods.getOutRoomAccept(ws);
          break;
        }
        case "createRoom": {
          const newRoom = new Room(jsonData.content);
          this.rooms.push(newRoom);

          const curUser = this.findCurrentUserByWebsocket(ws);
          newRoom.setOwner(curUser);

          serverMessageMethods.createRoomAccept(ws, newRoom);
          break;
        }
        default: {
          logMessage(jsonData.method);
          const curRoom = this.findRoomLinkByRoomID(jsonData.roomID);
          const itWasMachiCoroMessage = machiCoroHandler(jsonData, ws, curRoom, WebSocket.OPEN);
          if (itWasMachiCoroMessage) {
            logMessage("это была комнда machi Coro game");
          }
          logMessage(itWasMachiCoroMessage);
          break;
        }
      }
    }
  }

  initBasicRooms() {
    const room3 = new Room("third room");
    room3.setMaxUsersCount(2);

    this.rooms.push(new Room("first room"));
    this.rooms.push(new Room("second room"));
    this.rooms.push(room3);
  }

  initWssConectionHandler() {
    this.wss.on("connection", (ws) => {
      logMessage("new user");
      heartbeat(ws);
      this.users.push(new User(ws));
      ws.on("message", (data) => {
        heartbeat(ws);
        this.parseRequestFromClient(data, ws);
      });
    });
  }

  initPingInterval() {
    this.pingInterval = setInterval(() => {
      this.wss.clients.forEach((client) => {
        if (client.isAlive === false) {
          if (client.roomID) {
            const curRoom = this.findRoomLinkByRoomID(client.roomID);
            curRoom.removeUser(client);
          }
          return client.close();
        }
        client.isAlive = false;
        client.send("p");
      });
    }, intervalValueForPing);
  }

  initWssCloseHandler() {
    this.wss.on("close", () => {
      clearInterval(this.pingInterval);
    });
  }
}
