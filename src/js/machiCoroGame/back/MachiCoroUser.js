export class MachiCoroUser {
  constructor() {
    this.money = 60;
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
    const fullInfo = {
      money: this.getMoney(),
    }

    return fullInfo;
  }
}
