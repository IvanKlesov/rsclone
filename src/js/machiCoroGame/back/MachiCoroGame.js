import logMessage from "../../logger";
import machiCoroServerMessageMethods from "./machiCoroMessages/machiCoroServerMessageMethods";

export default class MachiCoroGame {
  // users = arrray of websockets?
  constructor(users) {
    this.users = users;
    this.userNumTurn = 0;
    this.resOfCubesThrow = -1;
    this.userThrowCube = false;
    this.userUseSwapPossibility = false;
    this.userUseStealPossibility = false;
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

  isNumberInArrayOFActivationNumbers(card, num) {
    return card.arrayOfActivationNumbers.indexOf(num) > -1;
  }

  calculateUserRedCardsIncome(curUser, randNum) {
    let getMoneyFromRedCards = 0;
    const userRedCards = curUser.getMachiCoroUser().getRedCards();
    userRedCards.forEach((card) => {
      if (this.isNumberInArrayOFActivationNumbers(card, randNum)) {
        getMoneyFromRedCards += card.cardIncome(curUser.getMachiCoroUser().getAllUserCards(), randNum);
      }
    });
    return getMoneyFromRedCards;
  }

  // should be calculated first
  calculateExpenses(activeUser, randNum) {
    // calculate from opponent's red cards;
    this.users.forEach((user) => {
      if (user !== activeUser) {
        const mustSubtractFromActiveUser = this.calculateUserRedCardsIncome(user, randNum);
        console.log("mustSubtractFromActiveUser:  ", mustSubtractFromActiveUser);
        console.log("mustSubtractFromActiveUserReverse:  ", -mustSubtractFromActiveUser);
        const SubtractFromActiveUser = this.updateUserMoney(activeUser, -mustSubtractFromActiveUser);
        if (SubtractFromActiveUser >= 0) {
          this.updateUserMoney(user, mustSubtractFromActiveUser);
          console.log("SubtractFromActiveUser:  ", mustSubtractFromActiveUser);
        }
      }
    });
  }

  calculateUserBlueCardsIncome(user, randNum) {
    logMessage("смотрим синие карты игрока");
    let getMoneyFromBlueCards = 0;
    const userBlueCards = user.getMachiCoroUser().getBlueCards()
    logMessage(userBlueCards);
    userBlueCards.forEach((card) => {
      if (this.isNumberInArrayOFActivationNumbers(card, randNum)) {
        getMoneyFromBlueCards += card.cardIncome(user.getMachiCoroUser().getAllUserCards(), randNum);
      }
    });
    logMessage("насчитали столько новых денюшек из синих карт: " + getMoneyFromBlueCards);
    this.updateUserMoney(user, getMoneyFromBlueCards);
    logMessage("Пересчитаем");
    logMessage(user.getMachiCoroUser())
  }

  calculateUserGreenCardsIncome(user, randNum) {
    logMessage("смотрим зеленые карты игрока");
    let getMoneyFromGreenCards = 0;
    const userGreenCards = user.getMachiCoroUser().getGreenCards();
    logMessage(userGreenCards);
    userGreenCards.forEach((card) => {
      if (this.isNumberInArrayOFActivationNumbers(card, randNum)) {
        getMoneyFromGreenCards += card.cardIncome(user.getMachiCoroUser().getAllUserCards(), randNum);
      }
    });
    logMessage("насчитали столько новых денюшек из зеленых карт: " + getMoneyFromGreenCards);
    this.updateUserMoney(user, getMoneyFromGreenCards);
    logMessage("Пересчитаем");
    logMessage(user.getMachiCoroUser())
  }

  calculateUserPurpleCardsIncome(curUser, randNum) {
    const curMachiCoroUser = curUser.getMachiCoroUser();
    const userPurpleCards = curMachiCoroUser.getPurpleCards();
    logMessage("Фиолетовые карты пользователя");
    const machiCoroUsers = this.users.map((user) => user.getMachiCoroUser());
    userPurpleCards.forEach((card) => {
      if (this.isNumberInArrayOFActivationNumbers(card, randNum)) {
        card.cardIncome(curMachiCoroUser, machiCoroUsers);
      }
    });
  }

  calculateIncomeFromShoppingCenter(activeUser) {
    const curMachiCoroUser = activeUser.getMachiCoroUser();
    if (curMachiCoroUser.hasShoppingCenter) {
      const shopingCenterCard = curMachiCoroUser.getAllUserCards.find((card) => card.name === "shoppingCenter");
      shopingCenterCard.attractionsCardEffect(activeUser);
    }
  }

  // should be calculated second
  calculateIncome(activeUser, randNum) {
    // calculate from blue card
    this.users.forEach((user) => {
      this.calculateUserBlueCardsIncome(user, randNum);
    });
    // if it is this user turn
    // calculate from green cars
    // calculate from purple cards
    this.calculateUserGreenCardsIncome(activeUser, randNum);
    this.calculateUserPurpleCardsIncome(activeUser, randNum);
    this.calculateIncomeFromShoppingCenter(activeUser)
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
    const randNum = 6;//this.generateRandNumbers(6 * numberOfCubes);
    machiCoroServerMessageMethods.sendResultOfThrowCube(this.users, this.userNumTurn, randNum);
    logMessage("randNum = " + randNum);
    this.userThrowCube = true;
    this.calculateExpenses(curActiveUser, randNum);
    this.calculateIncome(curActiveUser, randNum);
    this.resOfCubesThrow = randNum;
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

  swapUserCards(ws, secondUserID, firstUserCardName, secondUserCardName) {
    if (!this.userThrowCube) {
      machiCoroServerMessageMethods.sendError(ws, "you should throw cube(s)");
      return;
    }

    if (this.resOfCubesThrow !== 6) {
      machiCoroServerMessageMethods.sendError(ws, "throw result isn't 6");
      return;
    }

    const curActiveUser = this.users[this.userNumTurn];
    if (ws !== curActiveUser.getWs()) {
      machiCoroServerMessageMethods.sendError(ws, "it's not your turn");
      return;
    }

    if (this.userUseSwapPossibility) {
      machiCoroServerMessageMethods.sendError(ws, "You use this possibility in this turn");
      return;
    }

    const secondUser = this.users[secondUserID];
    if (curActiveUser === secondUser) {
      machiCoroServerMessageMethods.sendError(ws, "you can't swap with yourself");
      return;
    }
    const firstMachiCoroUser = curActiveUser.getMachiCoroUser();
    if (!firstMachiCoroUser.isUserHaveThisCard("businessCenter")) {
      machiCoroServerMessageMethods.sendError(ws, "you haven't card businessCenter");
      return;
    }
    const secondMachiCoroUser = secondUser.getMachiCoroUser();

    const firstUserCardIndex = firstMachiCoroUser.getUserCarIndex(firstUserCardName);
    if (firstUserCardIndex === -1) {
      machiCoroServerMessageMethods.sendError(ws, `you haven't card ${firstUserCardName}`);
      return;
    }

    const secondUserCardIndex = secondMachiCoroUser.getUserCarIndex(secondUserCardName);
    if (secondUserCardIndex === -1) {
      machiCoroServerMessageMethods.sendError(ws, `second user haven't card ${secondUserCardName}`);
      return;
    }

    const firstUserCards = firstMachiCoroUser.getAllUserCards();
    const secondUserCards = secondMachiCoroUser.getAllUserCards();

    const firstCardCopy = { ...firstUserCards[firstUserCardIndex] };
    firstUserCards[firstUserCardIndex] = { ...secondUserCards[secondUserCardIndex] };
    secondUserCards[secondUserCardIndex] = firstCardCopy;
    
    this.userUseSwapPossibility = true;
    machiCoroServerMessageMethods.swapAccept(this.users, this.userNumTurn, secondUserID, firstUserCardName, secondUserCardName);
  }

  steal(ws, secondUserID) {
    // duplicate checks with swa
    if (!this.userThrowCube) {
      machiCoroServerMessageMethods.sendError(ws, "you should throw cube(s)");
      return;
    }

    if (this.resOfCubesThrow !== 6) {
      machiCoroServerMessageMethods.sendError(ws, "throw result isn't 6");
      return;
    }

    const curActiveUser = this.users[this.userNumTurn];
    if (ws !== curActiveUser.getWs()) {
      machiCoroServerMessageMethods.sendError(ws, "it's not your turn");
      return;
    }

    if (this.userUseStealPossibility) {
      machiCoroServerMessageMethods.sendError(ws, "You use this possibility in this turn");
      return;
    }

    const secondUser = this.users[secondUserID];
    if (curActiveUser === secondUser) {
      machiCoroServerMessageMethods.sendError(ws, "you can't steal yourself");
      return;
    }

    const firstMachiCoroUser = curActiveUser.getMachiCoroUser();
    if (!firstMachiCoroUser.isUserHaveThisCard("telecentre")) {
      machiCoroServerMessageMethods.sendError(ws, "you haven't card telecentre");
      return;
    }
    const secondMachiCoroUser = secondUser.getMachiCoroUser();

    this.updateUserMoney(firstMachiCoroUser, 5);
    this.updateUserMoney(secondMachiCoroUser, -5);
    this.userUseStealPossibility = true;
    machiCoroServerMessageMethods.stealAccept(this.users, this.userNumTurn, secondUserID);

  }

  getNextUser() {
    if (this.userNumTurn + 1 === this.users.length) {
      this.userNumTurn = 0;
    } else {
      this.userNumTurn += 1;
    }
    this.userThrowCube = false;
    this.userMakeBuyInThisTurn = false;
    this.userUseSwapPossibility = false;
    this.userUseStealPossibility = false;
    this.resOfCubesThrow = -1;
    logMessage("this.userNumTurn now = ".concat(this.userNumTurn));
  }

  configurateInfoAboutAllUsers() {

  }

  updateUserMoney(user, moneyDelta) {
    return user.getMachiCoroUser().updateUserMoney(moneyDelta);
  }
}