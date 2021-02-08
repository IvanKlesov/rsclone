import { v4 as uuid } from "uuid";
import MachiCoroUser from "./machiCoroGame/back/MachiCoroUser";

export class User {
  constructor(webSocket) {
    this.ws = webSocket;
    this.id = uuid();
    this.oauthID;
    this.userName = "anonym";
    this.userPhotoAdress;
  }

  getWs() {
    return this.ws;
  }

  getUserID() {
    return this.id;
  }

  setRoomID(roomID) {
    this.roomID = roomID;
  }

  getRoomID() {
    return this.roomID;
  }

  removeRoomID() {
    this.roomID = undefined;
  }

  createMachiCoroUser() {
    this.machiCoroUser = new MachiCoroUser();
  }

  getMachiCoroUser() {
    return this.machiCoroUser;
  }

  getGameInfo() {
    return this.machiCoroUser.getFullInfoAboutMachiCoroUser();
  }

  setOauthID(newOauthID) {
    this.oauthID = newOauthID;
  }

  getOauthID() {
    return this.oauthID;
  }

  setUserName(newUserName) {
    this.userName = newUserName;
  }

  getUserName() {
    return this.userName;
  }

  setUserPhotoAdress(newAdress) {
    this.userPhotoAdress = newAdress;
  }

  getUserPhotoAdress() {
    return this.userPhotoAdress;
  }
}

export default User;
