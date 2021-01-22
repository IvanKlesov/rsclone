import logMessage from "../../logger";
import machiCoroServerMessageMethods from "./machiCoroMessages/machiCoroServerMessageMethods";

export default class MachiCoroGame {
  // users = arrray of websockets?
  constructor(users) {
    this.users = users;
    this.userNumTurn = 0;
    this.resOfCubesThrow = -1;
    this.userThrowCube = false;
    this.userMakeBuyInThisTurn = false;
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
      // if (card.effectCondition === "" && this.isNumberInArrayOFActivationNumbers(card, randNum)) {
      getMoneyFromBlueCards += card.cardIncome(user.getMachiCoroUser().getAllUserCards(), randNum);
      //}
    });
    logMessage("насчитали столько новых денюшек из синих карт: " + getMoneyFromBlueCards);
    this.updateUserMoney(user, getMoneyFromBlueCards);
    logMessage("Пересчитаем");
    logMessage(user.getMachiCoroUser())
  }

  /*   calculateUserGreenCardsIncome(user, randNum) {
      logMessage("смотрим зеленые карты игрока");
      let getMoneyFromGreenCards = 0;
      const userGreenCards = user.getMachiCoroUser().getGreenCards();
      logMessage(userGreenCards);
      userGreenCards.forEach((card) => {
        if (card.effectCondition === "" && this.isNumberInArrayOFActivationNumbers(card, randNum)) {
          getMoneyFromGreenCards += card.effectValue;
        }
      });
      logMessage("насчитали столько новых денюшек из зеленых карт: " + getMoneyFromGreenCards);
      this.updateUserMoney(user, getMoneyFromGreenCards);
      logMessage("Пересчитаем");
      logMessage(user.getMachiCoroUser())
    }
   */
  /* calculateUserPurpleCardsIncome(curUser, randNum) {
    let money = 0;
    const userPurpleCards = curUser.getMachiCoroUser().getPurpleCards();
    logMessage("Фиолетовые карты пользователя");
    userPurpleCards.forEach((card) => {
      if (this.isNumberInArrayOFActivationNumbers(card, randNum)) {
        if (card.effectCondition === "") {
          if (card.effect === "getMoneyFromAllUsers") {
            this.users.forEach((user) => {
              if (user !== curUser) {
                this.updateUserMoney(user, -card.effectValue);
                money += card.effectValue;
              }
            });
          }
        }
      }
    });
    this.updateUserMoney(curUser, money);
  } */

  // should be calculated second
  calculateIncome(activeUser, randNum) {
    // calculate from blue card
    this.users.forEach((user) => {
      this.calculateUserBlueCardsIncome(user, randNum);
      // if it is this user turn
      // calculate from green cars
      // calculate from purple cards
      /* if (user === activeUser) {
        this.calculateUserGreenCardsIncome(user, randNum);
      } */
    });
  }

  generateRandNumbers(maxNumber) {
    return Math.floor(Math.random() * Math.floor(maxNumber + 1)) || this.generateRandNumbers(maxNumber);
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

  buy(ws, buyRequest) {
    if (!this.userThrowCube || this.userMakeBuyInThisTurn) {
      return;
    }
    let curActiveUser = this.users[this.userNumTurn];
    if (ws !== curActiveUser.getWs()) {
      return;
    }
    const machiCoroUser = curActiveUser.getMachiCoroUser();
    const isCardAdded = machiCoroUser.addCard(buyRequest);
    if (isCardAdded) {
      this.userMakeBuyInThisTurn = true;
      logMessage("machiCoroServerMessageMethods.sendPurchaseInfo()");
      machiCoroServerMessageMethods.sendPurchaseInfo(this.users, this.userNumTurn, buyRequest);
      this.hold(ws);
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
    this.userMakeBuyInThisTurn = false;
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
