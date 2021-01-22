import logMessage from "../logger";

class Card {
  // arrayOfActivationNumbers = (1-3) == [1,2,3]
  constructor(name, cost, type, color, arrayOfActivationNumbers, income) {
    this.name = name;
    this.cost = cost;
    this.type = type;
    this.color = color;
    this.arrayOfActivationNumbers = arrayOfActivationNumbers;
    this.income = income;
  }

  cardIncome() {
    return this.income;
  }
}

// blue cards
class Longboat extends Card {
  constructor() {
    super("longboat", 2, "boat", "blue", [8], 3);
  }

  cardIncome(userCards) {
    if (userCards.findIndex((card) => card.name === "Port" > -1)) {
      return this.income;
    }
    return 0;
  }
}
class Forest extends Card {
  constructor() {
    super("forest", 3, "nature", "blue", [5], 5);
  }
}

class WheatField extends Card {
  constructor() {
    super("wheatField", 1, "agriculture", "blue", [1], 1);
  }
}

class Trawler extends Card {
  constructor() {
    super("trawler", 5, "boat", "blue", [12, 13, 14]);
  }

  cardIncome(userCards, cubeNumbers) {
    if (userCards.findIndex((card) => card.name === "Port" > -1)) {
      return cubeNumbers;
    }
    return 0;
  }
}

class Farm extends Card {
  constructor() {
    super("farm", 1, "farm", "blue", [2], 1);
  }
}

class FlowerGarden extends Card {
  constructor() {
    super("flowerGarden", 2, "agriculture", "blue", [4], 1);
  }
}

class Mine extends Card {
  constructor() {
    super("mine", 6, "nature", "blue", [9], 5);
  }
}

class AppleOrchard extends Card {
  constructor() {
    super("appleOrchard", 3, "agriculture", "blue", [10], 3);
  }
}

// green cards
class Store extends Card {
  constructor() {
    super("store", 2, "shop", "green", [4], 3);
  }
}

class FurnitureFactory extends Card {
  constructor() {
    super("furnitureFactory", 3, "production", "green", [8], 3);
  }

  cardIncome(userCards) {
    const cardsWithTypeNature = userCards.filter((card) => card.type === "nature");
    return cardsWithTypeNature.length * this.income;
  }
}

class VegetableMarket extends Card {
  constructor() {
    super("vegetableMarket", 2, "market", "green", [11, 12], 2);
  }

  cardIncome(userCards) {
    const agricultureCards = userCards.filter((card) => card.type === "agriculture");
    return agricultureCards.length * this.income;
  }
}
class Bakery extends Card {
  constructor() {
    super("bakery", 1, "shop", "green", [2, 3], 1);
  }
}

// продуктовый склад
class GroceryWarehouse extends Card {
  constructor() {
    super("groceryWarehouse", 2, "production", "green", [12, 13], 2);
  }

  cardIncome(userCards) {
    // implement after red cards
  }
}

class CheeseDairy extends Card {
  constructor() {
    super("cheeseDairy", 5, "production", "green". [7], 3);
  }

  cardIncome(userCards) {
    const cardsWithTypeFarm = userCards.filter((card) => card.type === "farm");
    return cardsWithTypeFarm.length * this.income;
  }
}

class FlowerStore extends Card {
  constructor() {
    super("flowerStore", 1, "shop", "green", [6], 1);
  }

  cardIncome(userCards) {
    const flowerGardenCards = userCards.filter((card) => card.name === "flowerGarden");
    return flowerGardenCards.length * this.income;
  }
}

export const cardFactory = (cardName) => {
  switch (cardName) {
    //blue
    // blue cards wich turn give money to owner
    case "longboat": {
      return new Longboat();
    }

    case "forest": {
      return new Forest();
    }
    // пшеничное поле - начальная карта - wheat field
    case "wheatField": {
      logMessage("cardFactory will create wheatField");
      return new WheatField();
    }

    case "trawler": {
      return new Trawler();
    }

    case "farm": {
      return new Farm();
    }

    case "flowerGarden": {
      return new FlowerGarden();
    }

    case "mine": {
      return new Mine();
    }

    case "appleOrchard": {
      return new AppleOrchard();
    }

    // green
    // green crads wich owner turn give money to onwer
    // пекарня - начальная карта - bakery

    case "store": {
      return new Store();
    }

    case "furnitureFactory": {
      return new FurnitureFactory();
    }

    case "vegetableMarket": {
      return new VegetableMarket();
    }

    case "bakery": {
      logMessage("cardFactory will create bakery");
      return new Bakery();
    }

    case "groceryWarehouse": {
      return new GroceryWarehouse();
    }

    case "cheeseDairy": {
      return new CheeseDairy();
    }

    case "flowerStore": {
      return new FlowerStore();
    }
    //red
    // red cards give money to owner from opponent cash

    /* case "cafe": {
      return new Card("cafe", 2, "cafe", "red", [5], effects.getMoneyFromActiveUser, 1, "");
    } */

    //суши бар

    //purple
    // red cards give money to owner in owner turn from opponent cash

    /* case "stadium": {
      return new Card("stadium", 6, "unic", "purple", [6], effects.getMoneyFromAllUsers, 2, "");
    } */

    default: {
      break;
    }
  }
}

export default cardFactory;
