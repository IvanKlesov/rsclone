import { MachiCoroUser }  from "./machiCoroGame/back/MachiCoroUser";

export class User {
  constructor(webSocket) {
    this.ws = webSocket;
  }

  getWs(){
    return this.ws;
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
