import { v4 as uuid } from "uuid";
import serverMessageMethods from "../server/messages/serverMessageMethods";
import MachiCoroGame from "./machiCoroGame/back/MachiCoroGame";

export class Room {
  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.users = [];
    this.maxUsersCount = 5;
    this.owner = undefined;
  }

  startMachiCoroGame(websocket, webSocketOpetState) {
    if (this.users.length > 1 && this.MachiCoroGame === undefined) {
      this.MachiCoroGame = new MachiCoroGame(this.getUsers());
      this.MachiCoroGame.start(websocket, webSocketOpetState);
    }
  }

  getMachiCoroGame() {
    return this.MachiCoroGame;
  }

  machiCoroGameHold(websocket) {
    this.MachiCoroGame.hold(websocket);
  }

  getUsers() {
    return this.users;
  }

  clients() {
    return this.users.map((user) => user.getWs());
  }

  addUser(newUser) {
    if (this.users.length >= this.maxUsersCount) {
      return false;
    }
    newUser.roomID = this.id;
    this.users.push(newUser);
    return true;
  }

  removeAllUsers() {
    this.users.forEach(client => {
      serverMessageMethods.getOutRoomAccept(client);
    });
    this.users.lenght = 0;
  }

  removeUser(user) {
    const userIndex = this.users.indexOf(user);
    if (userIndex > -1) {
      if (this.users[userIndex] === this.owner) {
        return false;
      }
      this.users.splice(userIndex, 1);
    }
    user.roomID = undefined;
    return true;
  }

  getRoomID() {
    return this.id;
  }

  setOwner(userOwner) {
    this.owner = userOwner;
    this.addUser(userOwner);
  }

  getOwner() {
    return this.owner;
  }

  setMaxUsersCount(newMaxCount) {
    this.maxUsersCount = newMaxCount;
  }

  getMaxUsersCount() {
    return this.maxUsersCount;
  }
}

export default Room;