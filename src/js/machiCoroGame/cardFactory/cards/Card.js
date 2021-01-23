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

export class BlueCards extends Card {
  constructor(name, cost, type, arrayOfActivationNumbers, income) {
    super(name, cost, type, "blue", arrayOfActivationNumbers, income);
  }
}

export class GreenCards extends Card {
  constructor(name, cost, type, arrayOfActivationNumbers, income) {
    super(name, cost, type, "green", arrayOfActivationNumbers, income);
  }
}

export class RedCard extends Card {
  constructor(name, cost, type, arrayOfActivationNumbers, income) {
    super(name, cost, type, "red", arrayOfActivationNumbers, income);
  }
}

export class PurpleCard extends Card {
  constructor(name, cost, type, arrayOfActivationNumbers, income) {
    super(name, cost, type, "purple", arrayOfActivationNumbers, income);
  }
}