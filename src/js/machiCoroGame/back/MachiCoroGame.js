import logMessage from "../../logger";
import machiCoroServerMessageMethods from "./machiCoroMessages/machiCoroServerMessageMethods";

import { businessCenterActivationNumbers, telecentreActivationNumbers } from "../cardFactory/cards/purpleCards";

export default class MachiCoroGame {
  // users = arrray of websockets?
  constructor(users) {
    this.users = users;
    this.userNumTurn = 0;

    this.resOfCubesThrow = -1;
    this.userThrowCube = false;
    this.userThrowDoubleCubes = false;
    this.userThrowRequestForPortBonus = false;
    this.userReThrowCubesRequest = false;

    this.userUseSwapPossibility = false;
    this.userUseStealPossibility = false;
    this.userMakeBuyInThisTurn = false;

    this.buyInThisTurn = "";
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
        const SubtractFromActiveUser = this.updateUserMoney(activeUser, -mustSubtractFromActiveUser);
        if (SubtractFromActiveUser >= 0) {
          this.updateUserMoney(user, mustSubtractFromActiveUser);
        }
      }
    });
  }

  calculateUserBlueCardsIncome(user, randNum) {
    let getMoneyFromBlueCards = 0;
    const userBlueCards = user.getMachiCoroUser().getBlueCards()

    userBlueCards.forEach((card) => {
      if (this.isNumberInArrayOFActivationNumbers(card, randNum)) {
        getMoneyFromBlueCards += card.cardIncome(user.getMachiCoroUser().getAllUserCards(), randNum);
      }
    });

    this.updateUserMoney(user, getMoneyFromBlueCards);
  }

  calculateUserGreenCardsIncome(user, randNum) {
    let getMoneyFromGreenCards = 0;
    const userGreenCards = user.getMachiCoroUser().getGreenCards();
    userGreenCards.forEach((card) => {
      if (this.isNumberInArrayOFActivationNumbers(card, randNum)) {
        getMoneyFromGreenCards += card.cardIncome(user.getMachiCoroUser().getAllUserCards(), randNum);
      }
    });
    this.updateUserMoney(user, getMoneyFromGreenCards);
  }

  calculateUserPurpleCardsIncome(curUser, randNum) {
    const curMachiCoroUser = curUser.getMachiCoroUser();
    const userPurpleCards = curMachiCoroUser.getPurpleCards();
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
      if (!this.users[this.userNumTurn].getMachiCoroUser().hasRadioTower || this.userReThrowCubesRequest) {
        machiCoroServerMessageMethods.sendError(ws, "you already throw cube(s) in this turn");
        return;
      } else {
        this.userReThrowCubesRequest = true;
      }
    }
    const curActiveUser = this.users[this.userNumTurn];
    if (ws !== curActiveUser.getWs()) {
      machiCoroServerMessageMethods.sendError(ws, "it's not your turn");
      return;
    }
    const randNum = this.generateRandNumbers(6);
    if (numberOfCubes === 2) {
      if (!this.isUserHaveCard(ws, this.userNumTurn, "railwayStation")) {
        return;
      }
      const randNum2 = this.generateRandNumbers(6);
      this.resOfCubesThrow = randNum + randNum2;
      machiCoroServerMessageMethods.sendResultOfThrowCube(this.users, this.userNumTurn, [randNum, randNum2]);
      if (randNum === randNum2 && this.isUserHaveCard(ws, this.userNumTurn, "amusementPark")) {
        this.userThrowDoubleCubes = true;
        machiCoroServerMessageMethods.sendError(ws, "you get double dice bonus");
      }
    } else {
      this.resOfCubesThrow = randNum;
      machiCoroServerMessageMethods.sendResultOfThrowCube(this.users, this.userNumTurn, randNum);
    }

    this.userThrowCube = true;
    if (curActiveUser.getMachiCoroUser().hasPort) {
      this.userThrowRequestForPortBonus = true;
      if (curActiveUser.getMachiCoroUser().hasRadioTower && !this.userReThrowCubesRequest) {
        this.sendRequestForAcceptPortBonus(ws, "also you can rethrow cube(s)");
      } else {
        this.sendRequestForAcceptPortBonus(ws);
      }
    } else {
      if (curActiveUser.getMachiCoroUser().hasRadioTower && !this.userReThrowCubesRequest) {
        this.sendRequestForAcceptRethrowCubes(ws);
      } else {
        this.calculateExpenses(curActiveUser, randNum);
        this.calculateIncome(curActiveUser, randNum);
        return randNum;
      }
    }
  }

  isUserThrowCubesInThisTurn(ws) {
    if (!this.userThrowCube) {
      machiCoroServerMessageMethods.sendError(ws, "you should throw cube(s)");
      return false;
    }
    return true;
  }

  isResultOfCubesThrowActivateCard(ws, activationArray) {
    if (activationArray.indexOf(this.resOfCubesThrow) === -1) {
      machiCoroServerMessageMethods.sendError(ws, `throw result(${this.resOfCubesThrow}) not in activationArray ${activationArray}`);
      return false;
    }
    return true;
  }

  isThisUserTurn(ws) {
    if (ws !== this.users[this.userNumTurn].getWs()) {
      machiCoroServerMessageMethods.sendError(ws, "it's not your turn");
      return false;
    }
    return true;
  }

  isUserDontUsePossibility(ws, possibility) {
    if (possibility) {
      machiCoroServerMessageMethods.sendError(ws, "You use this possibility in this turn");
      return false;
    }
    return true;
  }

  isSecondUserExist(ws, secondUserID) {
    if (!this.users[secondUserID]) {
      machiCoroServerMessageMethods.sendError(ws, "can't find second user");
      return false;
    }
    return true;
  }

  isSecondUserDontEqualsToActiveUser(ws, secondUserID, methodName) {
    if (ws === this.users[secondUserID].getWs()) {
      machiCoroServerMessageMethods.sendError(ws, `you can't ${methodName} with yourself`);
      return false;
    }
    return true;
  }

  isUserHaveCard(ws, userID, cardName) {
    const user = this.users[userID].getMachiCoroUser();
    if (!user.isUserHaveThisCard(cardName)) {
      machiCoroServerMessageMethods.sendError(ws, `player${userID} haven't card ${cardName}`);
      return false;
    }
    return true;
  }

  sendRequestForAcceptPortBonus(ws, additionalInfo = "") {
    machiCoroServerMessageMethods.sendError(ws, "You have card port.You can get 2 throw point bonus.Send /acceptPortBonus or /rejectPortBonus command;"
      .concat(additionalInfo));
  }

  sendRequestForAcceptRethrowCubes(ws) {
    machiCoroServerMessageMethods.sendError(ws, "You have card radiTower.You can rethrow cubes.To rethrow send /throw. To accept current result"
      .concat(" send /acceptThrow command"));
  }

  isUserUsePortOrRadioTowerBonus(ws, additionalConditionForRadio = true) {
    if (this.userThrowRequestForPortBonus) {
      if (this.users[this.userNumTurn].getMachiCoroUser().hasRadioTower && !this.userReThrowCubesRequest) {
        this.sendRequestForAcceptPortBonus(ws, "also you can rethrow cube(s)");
      } else {
        this.sendRequestForAcceptPortBonus(ws);
      }
      return false;
    } else if (this.users[this.userNumTurn].getMachiCoroUser().hasRadioTower && !this.userReThrowCubesRequest
      && additionalConditionForRadio) {
      this.sendRequestForAcceptRethrowCubes(ws);
      return false;
    }
    return true;
  }

  buy(ws, buyRequest) {
    if (!this.isUserUsePortOrRadioTowerBonus(ws)
      || !this.userThrowCube
      || this.userMakeBuyInThisTurn
      || !this.isThisUserTurn(ws)) {
      return;
    }

    const curActiveUser = this.users[this.userNumTurn];
    const machiCoroUser = curActiveUser.getMachiCoroUser();
    const isCardAdded = machiCoroUser.addCard(buyRequest);

    if (isCardAdded) {
      this.userMakeBuyInThisTurn = true;
      this.buyInThisTurn = buyRequest;
      machiCoroServerMessageMethods.sendPurchaseInfo(this.users, this.userNumTurn, buyRequest);
      this.hold(ws);
    }
  }

  hold(ws) {
    if (!this.isUserUsePortOrRadioTowerBonus(ws, this.buyInThisTurn !== "radioTower")
      || !this.userThrowCube) {
      return
    }
    let curActiveUser = this.users[this.userNumTurn];
    if (curActiveUser.getWs() === ws) {
      this.tryUseAirportBonus(ws);
      this.getNextUser();
      curActiveUser = this.users[this.userNumTurn];
      machiCoroServerMessageMethods.sendUserGameInfo(this.users, curActiveUser);
    }
  }

  isConditionForSpecialCardPassed(ws, activationNumbersArray, possibility, secondUserID, possibilityName, cardName) {
    if (!this.isUserUsePortOrRadioTowerBonus(ws)
      || !this.isUserThrowCubesInThisTurn(ws)
      || !this.isResultOfCubesThrowActivateCard(ws, activationNumbersArray)
      || !this.isThisUserTurn(ws)
      || !this.isUserDontUsePossibility(ws, possibility)
      || !this.isSecondUserExist(ws, secondUserID)
      || !this.isSecondUserDontEqualsToActiveUser(ws, secondUserID, possibilityName)
      || !this.isUserHaveCard(ws, this.userNumTurn, cardName)) {
      return false;
    }
    return true;
  }

  swapUserCards(ws, secondUserID, firstUserCardName, secondUserCardName) {
    if (!this.isConditionForSpecialCardPassed(ws, businessCenterActivationNumbers,
      this.userUseSwapPossibility, secondUserID, "swap", "businessCenter")) {
      return;
    }
    const firstMachiCoroUser = this.users[this.userNumTurn].getMachiCoroUser();
    const secondMachiCoroUser = this.users[secondUserID].getMachiCoroUser();

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
    if (!this.isConditionForSpecialCardPassed(ws, telecentreActivationNumbers,
      this.userUseStealPossibility, secondUserID, "steal", "telecentre")) {
      return;
    }

    this.updateUserMoney(this.users[this.userNumTurn], 5);
    this.updateUserMoney(this.users[secondUserID], -5);
    this.userUseStealPossibility = true;
    machiCoroServerMessageMethods.stealAccept(this.users, this.userNumTurn, secondUserID);
  }

  isConditionForUsingPortBonusCompleted(ws) {
    if (!this.isUserThrowCubesInThisTurn(ws)
      || !this.isThisUserTurn(ws)
      || !this.isUserHaveCard(ws, this.userNumTurn, "port")) {
      return false;
    }
    return true;
  }

  acceptPortBonus(ws) {
    if (this.isConditionForUsingPortBonusCompleted(ws) && this.userThrowRequestForPortBonus) {
      this.userThrowRequestForPortBonus = false;
      this.userReThrowCubesRequest = true;
      this.resOfCubesThrow += 2;
      const curActiveUser = this.users[this.userNumTurn];
      this.calculateExpenses(curActiveUser, this.resOfCubesThrow);
      this.calculateIncome(curActiveUser, this.resOfCubesThrow);
      machiCoroServerMessageMethods.portBonusResult(this.users, this.userNumTurn, "accept");
    }
  }

  rejectPortBonus(ws) {
    if (this.isConditionForUsingPortBonusCompleted(ws) && this.userThrowRequestForPortBonus) {
      this.userThrowRequestForPortBonus = false;
      this.userReThrowCubesRequest = true;
      const curActiveUser = this.users[this.userNumTurn];
      this.calculateExpenses(curActiveUser, this.resOfCubesThrow);
      this.calculateIncome(curActiveUser, this.resOfCubesThrow);
      machiCoroServerMessageMethods.portBonusResult(this.users, this.userNumTurn, "reject");
    }
  }

  acceptThrow(ws) {
    if (!this.isUserThrowCubesInThisTurn(ws)
      || !this.isThisUserTurn(ws)
      || !this.isUserHaveCard(ws, this.userNumTurn, "radioTower")) {
      return;
    }
    this.userThrowCube = true;
    this.userReThrowCubesRequest = true;
    this.userThrowRequestForPortBonus = false;
    this.calculateExpenses(this.users[this.userNumTurn], this.resOfCubesThrow);
    this.calculateIncome(this.users[this.userNumTurn], this.resOfCubesThrow);
  }

  getNextUser() {
    if (!this.userThrowDoubleCubes) {
      if (this.userNumTurn + 1 === this.users.length) {
        this.userNumTurn = 0;
      } else {
        this.userNumTurn += 1;
      }
    }
    this.userThrowCube = false;
    this.userThrowDoubleCubes = false;
    this.userThrowRequestForPortBonus = false;
    this.userReThrowCubesRequest = false;
    this.userMakeBuyInThisTurn = false;

    this.userUseSwapPossibility = false;
    this.userUseStealPossibility = false;
    this.resOfCubesThrow = -1;

    this.buyInThisTurn = "";
  }

  tryUseAirportBonus(ws) {
    if (this.isUserHaveCard(ws, this.userNumTurn, "airport") && !this.userMakeBuyInThisTurn) {
      this.updateUserMoney(this.users[this.userNumTurn], 10);
      machiCoroServerMessageMethods.sendError(ws, "you take 10 monets from airport");
    }
  }

  updateUserMoney(user, moneyDelta) {
    return user.getMachiCoroUser().updateUserMoney(moneyDelta);
  }
}
