import logMessage from "../../logger";
import machiCoroServerMessageMethods from "./machiCoroMessages/machiCoroServerMessageMethods";

export default class MachiCoroGame {
  // users = arrray of websockets?
  constructor(users) {
    this.users = users;
    this.userNumTurn = 0;
  }

  start(ws, webSocketOpetState) {
    const curActiveUser = this.users[this.userNumTurn];
    this.users.forEach((user) => {
      user.createMachiCoroUser();
    });
    machiCoroServerMessageMethods.gameStarted(this.users, ws, webSocketOpetState);
    machiCoroServerMessageMethods.sendUserGameInfo(this.users, curActiveUser);

    /* this.users.forEach((user) => {
      user.getWs().
    }); */
  }

  buy() {

  }

  hold(ws) {
    let curActiveUser = this.users[this.userNumTurn];
    if (curActiveUser.getWs() === ws) {
      this.getNextUser();
      curActiveUser = this.users[this.userNumTurn];
      machiCoroServerMessageMethods.sendUserGameInfo(this.users, curActiveUser);
    } 
  }

  getNextUser() {
    if (this.userNumTurn + 1 === this.users.length) {
      this.userNumTurn = 0;
    } else {
      this.userNumTurn += 1;
    }
    logMessage("this.userNumTurn now = ".concat(this.userNumTurn));
  }

  configurateInfoAboutAllUsers() {

  }

  updateUserMoney(user) {

  }
}