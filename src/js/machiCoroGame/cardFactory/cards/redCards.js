// red cards
import { RedCard as Card } from "./Card";

// закусочная
export class Diner extends Card {
  constructor() {
    super("diner", 1, "cafe", [8], 1);
  }
}

export class Cafe extends Card {
  constructor() {
    super("cafe", 2, "cafe", [3], 1);
  }
}

export class Pizzeria extends Card {
  constructor() {
    super("pizzeria", 1, "cafe", [7], 1);
  }
}

export class Restaurant extends Card {
  constructor() {
    super("restaurant", 3, "cafe", [9, 10], 2);
  }
}

export class SushiBar extends Card {
  constructor() {
    super("sushiBar", 2, "cafe", [1], 3);
  }

  cardIncome(userCards) {
    if (userCards.findIndex((card) => card.name === "port" > -1)) {
      return this.income;
    }
    return 0;
  }
}
