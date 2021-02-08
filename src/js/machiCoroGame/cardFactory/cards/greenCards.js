// green cards
import { GreenCards as Card } from "./Card";

export class Store extends Card {
  constructor() {
    super("store", 2, "shop", [4], 3);
  }
}

export class FurnitureFactory extends Card {
  constructor() {
    super("furnitureFactory", 3, "production", [8], 3);
  }

  cardIncome(userCards) {
    const cardsWithTypeNature = userCards.filter((card) => card.type === "nature");
    return cardsWithTypeNature.length * this.income;
  }
}

export class VegetableMarket extends Card {
  constructor() {
    super("vegetableMarket", 2, "market", [11, 12], 2);
  }

  cardIncome(userCards) {
    const agricultureCards = userCards.filter((card) => card.type === "agriculture");
    return agricultureCards.length * this.income;
  }
}
export class Bakery extends Card {
  constructor() {
    super("bakery", 1, "shop", [2, 3], 1);
  }
}

// продуктовый склад
export class GroceryWarehouse extends Card {
  constructor() {
    super("groceryWarehouse", 2, "production", [12, 13], 2);
  }

  cardIncome(userCards) {
    const cardsWithTypeCafe = userCards.filter((card) => card.type === "cafe");
    return cardsWithTypeCafe.length * this.income;
  }
}

export class CheeseDairy extends Card {
  constructor() {
    super("cheeseDairy", 5, "production", [7], 3);
  }

  cardIncome(userCards) {
    const cardsWithTypeFarm = userCards.filter((card) => card.type === "farm");
    return cardsWithTypeFarm.length * this.income;
  }
}

export class FlowerStore extends Card {
  constructor() {
    super("flowerStore", 1, "shop", [6], 1);
  }

  cardIncome(userCards) {
    const flowerGardenCards = userCards.filter((card) => card.name === "flowerGarden");
    return flowerGardenCards.length * this.income;
  }
}
