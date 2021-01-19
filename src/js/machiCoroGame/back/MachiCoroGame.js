import machiCoroServerMessageMethods from "./machiCoroMessages/machiCoroServerMessageMethods";

export default class MachiCoroGame {
  // users = arrray of websockets?
  constructor(users) {
    this.users = users;
  }

  start(ws, webSocketOpetState) {
    this.users.forEach((user) => {
      user.createMachiCoroUser();
    });
    machiCoroServerMessageMethods.gameStarted(this.users, ws, webSocketOpetState);
    machiCoroServerMessageMethods.sendUserGameInfo(this.users);

    /* this.users.forEach((user) => {
      user.getWs().
    }); */
  }

  configurateInfoAboutAllUsers() {

  }

  updateUserMoney(user) {

  }
}