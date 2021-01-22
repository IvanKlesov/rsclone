import logMessage from "../logger";

// add effect, effectValue, effectCondition as decorator
class Card {
  // arrayOfActivationNumbers = (1-3) == [1,2,3]
  constructor(name, cost, type, color, arrayOfActivationNumbers, income, /*  effect, , effectCondition = "" */) {
    this.name = name;
    this.cost = cost;
    this.type = type;
    this.color = color;
    this.arrayOfActivationNumbers = arrayOfActivationNumbers;
    // this.effectValue = effectValue;
    this.income = income;
    // this.effect = effect;

    // this.effectCondition = effectCondition;
  }

  cardIncome() {
    return this.income;
  }
}

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





/* class FlowerStore extends Card {
  constructor()
}
 */
const effects = {
  getMoneyFromBank: "getMoneyFromBank",
  getMoneyForEachBuildingWithName: "getMoneyForEachBuildingWithName",
  getMoneyFromActiveUser: "getMoneyFromActiveUser",
  getMoneyFromAllUsers: "getMoneyFromAllUsers",
};

effects.getMoneyFromBank = () => {
  return effectValue;
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
    /* case "bakery": {
      logMessage("cardFactory will create bakery");
      return new Card("bakery", 1, "shop", "green", [2, 3], 1);
    }

    case "store": {
      return new Card("store", 2, "shop", "green", [4], 3);
    } */

    /* case "flowerStore": {
      return new Card("flowerStore", 1, "shop", "green", [6], 1);
    } */

    /* case "vegetableMarket": {
      return new Card("vegetableMarket", );
    } */


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
