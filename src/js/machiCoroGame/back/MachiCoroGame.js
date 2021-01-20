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
  }

  // should be calculated first
  calculateExpenses() {
    // calculate from opponent's red cards;
  }

  isNumberInArrayOFActivationNumbers(card, num) {
    return card.arrayOfActivationNumbers.indexOf(num) > -1;
  }

  calculateUserBlueCardsIncome(user, randNum) {
    logMessage("смотрим синие карты игрока");
    let getMoneyFromBlueCards = 0;
    const userBlueCards = user.getMachiCoroUser().getBlueCards()
    logMessage(userBlueCards);
    userBlueCards.forEach((card) => {
      if (card.effectCondition === "" && this.isNumberInArrayOFActivationNumbers(card, randNum)) {
        getMoneyFromBlueCards += card.effectValue;
      }
    });
    logMessage("насчитали столько новых денюшек из синих карт: " + getMoneyFromBlueCards);
    this.updateUserMoney(user, getMoneyFromBlueCards);
    logMessage("Пересчитаем");
    logMessage(user.getMachiCoroUser())
  }
  // should be calculated second
  calculateIncome(activeUser, randNum) {
    // calculate from blue card
    this.users.forEach((user) => {
      /* if (user === activeUser){} */
      this.calculateUserBlueCardsIncome(user, randNum);
    });

    // if it is this user turn
    // calculate from green cars
    // calculate from purple cards
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
    this.calculateIncome(curActiveUser, randNum);
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

  updateUserMoney(user, moneyDelta) {
    const machiCoroUser = user.getMachiCoroUser();
    const oldMoney = machiCoroUser.getMoney();
    let newMoney = oldMoney + moneyDelta;
    if (newMoney < 0) {
      newMoney = 0;
    }
    machiCoroUser.setMoney(newMoney);
  }
}
