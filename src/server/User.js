// import { v4 as uuid } from "uuid";

export class User {
  constructor(webSocket) {
    // this.id = uuid();
    this.ws = webSocket;
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
}

export default User;
