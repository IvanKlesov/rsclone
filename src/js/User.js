import { v4 as uuid } from "uuid";
import { MachiCoroUser }  from "./machiCoroGame/back/MachiCoroUser";
// import cardFactory from "./machiCoroGame/cards";

export class User {
  constructor(webSocket) {
    this.ws = webSocket;
    this.id = uuid();
  }

  getWs(){
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
}

export default User;
