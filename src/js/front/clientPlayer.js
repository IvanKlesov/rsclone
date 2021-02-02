export default class clientPlayer {
  static setWs(ws) {
    this.ws = ws;
  }

  static getWs() {
    return this.ws;
  }

  static setRoomID(roomID) {
    this.roomID = roomID;
  }

  static getRoomID() {
    return this.roomID;
  }
}
