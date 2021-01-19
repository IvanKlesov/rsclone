class Card {
  // arrayOfActivationNumbers = (1-3) == [1,2,3]
  constructor(name, cost, type, color, arrayOfActivationNumbers, effect, effectValue, effectCondition = "") {
    this.name = name;
    this.cost = cost;
    this.type = type;
    this.color = color;
    this.arrayOfActivationNumbers = arrayOfActivationNumbers;
    this.effect = effect;
    this.effectValue = effectValue;
    this.effectCondition = effectCondition;
  }
}

const effects = {
  getMoneyFromBank,
  getMoneyForEachBuildingWithName,
  getMoneyFromActiveUser
};

export const cardFactory = (cardName) => {
  switch (cardName.toLowerCase()) {
    default: {
      return undefined;
    }
    // green
    // green crads wich owner turn give money to onwer
    // пекарня - начальная карта - bakery
    case "bakery": {
      return new Card("bakery", 1, "shop", "green", [2, 3], effects.getMoneyFromBank, 1, "");
    }

    case "store": {
      return new Card("store", 2, "shop", "green", [4], effects.getMoneyFromBank, 3, "");
    }

    case "flowerStore": {
      return new Card("flowerStore", 1, "shop", "green", [6], effects.getMoneyForEachBuildingWithName, 1, "flowerGarden");
    }

    /* case "vegetableMarket": {
      return new Card("vegetableMarket", );
    } */

    //blue
    // blue cards wich turn give money to owner
    // пшеничное поле - начальная карта - wheat field
    case "wheatField": {
      return new Card("wheatField", 1, "agriculture", "blue", [1], effects.getMoneyFromBank, 1, "");
    }

    case "farm": {
      return new Card("farm", 1, "farm", "blue", [2], effects.getMoneyFromBank, 1, "");
    }

    case "flowerGarden": {
      return new Card("flowerGarden", 2, "agriculture", "blue", [4], effects.getMoneyFromBank, 1, "");
    }

    case "forest": {
      return new Card("forest", 3, "nature", "blue", [5], effects.getMoneyFromBank, 5, "");
    }

    //red
    // red cards give money to owner from opponent cash

    case "cafe": {
      return new Card("cafe", 2, "cafe", "red", [5], effects.getMoneyFromActiveUser, 1, "");
    }

    //суши бар

    //purple
    // red cards give money to owner in owner turn from opponent cash

  }
}

export default cardFactory;
