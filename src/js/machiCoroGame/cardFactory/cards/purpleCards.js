// red cards
// cardIncome function for purpleCards take activeUser and usersList(machi coro users);
// activeUser === activeUser.getMachiCoroUser();
import { PurpleCard as Card } from "./Card";

export class BusinessCenter extends Card {
  constructor() {
    super("businessCenter", 8, "unic", [6], 0);
  }
}

export class PublishingHouse extends Card {
  constructor() {
    super("publishingHouse", 5, "unic", [7], 1);
  }

  // userCards, randNum , users, activeUser
  cardIncome(activeUser, users) {
    // types cafe and shop
    users.forEach((user) => {
      if (user !== activeUser) {
        const buildingsForWhichWeConsiderPayment = user.getAllUserCards().filter((card) => card.type === "cafe" || card.type === "shop");
        user.updateUserMoney(-buildingsForWhichWeConsiderPayment.length)
        activeUser.updateUserMoney(buildingsForWhichWeConsiderPayment.length)
      }
    });
    return 0;
  }
}

export class Tax extends Card {
  constructor() {
    super("tax", 4, "unic", [8, 9], 0);
  }

  cardIncome(activeUser, users) {
    users.forEach((user) => {
      if (user !== activeUser) {
        const userMoney = user.getMoney();
        if (userMoney >= 10) {
          const userMoneyHalf = Math.floor(userMoney / 2);
          user.updateUserMoney(-userMoneyHalf);
          activeUser.updateUserMoney(userMoneyHalf);
        }
      }
    });
    return 0;
  }
}

export class Stadium extends Card {
  constructor() {
    super("stadium", 6, "unic", [6], 2);
  }

  cardIncome(activeUser, users) {
    users.forEach((user) => {
      if (user !== activeUser) {
        user.updateUserMoney(-2);
        activeUser.updateUserMoney(2);
      }
    });
    return 0;
  }
}

export class Telecentre extends Card {
  constructor() {
    super("telecentre", 7, "unic", [6], 0);
  }
}
