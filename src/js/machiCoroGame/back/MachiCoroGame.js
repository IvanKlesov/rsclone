import logMessage from "../../logger";
import machiCoroServerMessageMethods from "./machiCoroMessages/machiCoroServerMessageMethods";

export default class MachiCoroGame {
  // users = arrray of websockets?
  constructor(users) {
    this.users = users;
    this.userNumTurn = 0;
    this.resOfCubesThrow = -1;
    this.userThrowCube = false;
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

  generateRandNumbers(maxNumber) {
    return Math.floor(Math.random() * Math.floor(maxNumber)) || 1;
  }

  throwCubes(ws, numberOfCubes = 1) {
    if (this.userThrowCube) {
      return;
    }
    const curActiveUser = this.users[this.userNumTurn];
    if (ws !== curActiveUser.getWs()) {
      return;
    }
    const randNum = this.generateRandNumbers(6 * numberOfCubes);
    machiCoroServerMessageMethods.sendResultOfThrowCube(this.users, this.userNumTurn, randNum);
    logMessage("randNum = " + randNum);
    this.userThrowCube = true;
    return randNum;
  }

  buy() {
    if (this.userThrowCube) {
      return;
    }
  }

  hold(ws) {
    if (!this.userThrowCube) {
      return;
    }
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
    this.userThrowCube = false;
    logMessage("this.userNumTurn now = ".concat(this.userNumTurn));
  }

  configurateInfoAboutAllUsers() {

  }

  updateUserMoney(user) {

  }
}
