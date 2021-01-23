import cardFactory from "../cardFactory/cardFactory";// "../cards/cardFactory";
import logMessage from "../../../js/logger";

export class MachiCoroUser {
  constructor() {
    this.money = 3;
    this.userCards = [];
    this.initBasicUserCards();
    // cardsArray wich contain 2 basic card
    // array of great buildings 
  }

  setMoney(newMoneyValue) {
    this.money = newMoneyValue;
  }

  getMoney() {
    return this.money;
  }

  getFullInfoAboutMachiCoroUser() {
    logMessage("usercards: ");
    logMessage(this.userCards);
    const cards = this.userCards.map((card) => {
      logMessage(card);
      logMessage(card.name);
      return card.name;
    });
    logMessage("user have this cards: ");
    logMessage(cards);
    const fullInfo = {
      money: this.getMoney(),
      cards,
    }
    return fullInfo;
  }

  addCard(cardName) {
    const newCard = cardFactory(cardName);
    logMessage("addCard func");
    if (newCard) {
      const cardCondition = newCard.cost <= this.getMoney();
      if (cardCondition) {
        this.userCards.push(newCard);
        return true;
      }
    }
    logMessage("addCard func return false");
    return false;
  }

  initBasicUserCards() {
    // this.userCards.push(cardFactory("bakery"));
    this.userCards.push(cardFactory("wheatField"));
    logMessage("initBasicUserCards end ");
    logMessage(this.userCards);
  }

  getAllUserCards() {
    return this.userCards;
  }

  getCardWithColor(color) {
    return this.userCards.filter((card) => card.color === color);
  }

  getBlueCards() {
    return this.getCardWithColor("blue");
  }

  getGreenCards() {
    return this.getCardWithColor("green");
  }

  getRedCards() {
    return this.getCardWithColor("red");
  }

  getPurpleCards() {
    return this.getCardWithColor("purple");
  }

  updateUserMoney( moneyDelta) {
    const oldMoney = this.getMoney();
    logMessage("updateUserMoney oldMoney: " + oldMoney);
    let newMoney = oldMoney + moneyDelta;
    logMessage("updateUserMoney newMoney: " + newMoney);
    const newMoneyBeforeCorrection = newMoney;
    if (newMoney < 0) {
      newMoney = 0;
    }
    logMessage("updateUserMoney newMoney2: " + newMoney);
    this.setMoney(newMoney);
    return newMoneyBeforeCorrection;
  }
}
