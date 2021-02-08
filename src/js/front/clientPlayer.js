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

  static setRegistrationData(registrationData) {
    this.registrationData = registrationData;
  }

  static getRegistrationData() {
    return this.registrationData;
  }

  static setInfoAboutUsersInRoomArray(infoAboutUsersInRoomArray) {
    this.infoAboutUsersInRoomArray = infoAboutUsersInRoomArray;
  }

  static getInfoAboutUsersInRoomArray() {
    return this.infoAboutUsersInRoomArray;
  }

  static setRoomUserImages(roomUserImages) {
    this.roomUserImages = roomUserImages;
  }

  static getRoomUserImages() {
    return this.roomUserImages;
  }
}
