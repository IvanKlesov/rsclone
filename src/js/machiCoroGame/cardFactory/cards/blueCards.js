// blue cards
import { BlueCards as Card } from "./Card";

export class Longboat extends Card {
  constructor() {
    super("longboat", 2, "boat", [8], 3);
  }

  cardIncome(userCards) {
    if (userCards.findIndex((card) => card.name === "port" > -1)) {
      return this.income;
    }
    return 0;
  }
}
export class Forest extends Card {
  constructor() {
    super("forest", 3, "nature", [5], 5);
  }
}

export class WheatField extends Card {
  constructor() {
    super("wheatField", 1, "agriculture", [1], 1);
  }
}

export class Trawler extends Card {
  constructor() {
    super("trawler", 5, "boat", [12, 13, 14]);
  }

  cardIncome(userCards, cubeNumbers) {
    if (userCards.findIndex((card) => card.name === "port" > -1)) {
      return cubeNumbers;
    }
    return 0;
  }
}

export class Farm extends Card {
  constructor() {
    super("farm", 1, "farm", [2], 1);
  }
}

export class FlowerGarden extends Card {
  constructor() {
    super("flowerGarden", 2, "agriculture", [4], 1);
  }
}

export class Mine extends Card {
  constructor() {
    super("mine", 6, "nature", [9], 5);
  }
}

export class AppleOrchard extends Card {
  constructor() {
    super("appleOrchard", 3, "agriculture", [10], 3);
  }
}
