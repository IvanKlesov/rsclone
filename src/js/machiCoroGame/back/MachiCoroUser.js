import cardFactory from "../cards";
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

  initBasicUserCards() {
    this.userCards.push(cardFactory("bakery"));
    this.userCards.push(cardFactory("wheatField"));
    logMessage("initBasicUserCards end ");
    logMessage(this.userCards);
  }
}
