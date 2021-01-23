// all attraction Card take user(MachiCoroUser) in attractionsCardEffect func
class AttractionsCard {
  constructor(name, cost) {
    this.name = name;
    this.cost = cost;
    this.type = "unic";
    this.color = "attraction";
  }
}

export class Airport extends AttractionsCard {
  constructor() {
    super("airport", 30);
  }

  toggleСardIndicator(user) {
    user.hasAirport = true;
  }

  attractionsCardEffect(user) {

  }
}

export class RailwayStation extends AttractionsCard {
  constructor() {
    super("railwayStation", 4);
  }

  toggleСardIndicator(user) {
    user.hasRailwayStation = true;
  }

  attractionsCardEffect(user) {

  }
}

export class AmusementPark extends AttractionsCard {
  constructor() {
    super("amusementPark", 16);
  }

  toggleСardIndicator(user) {
    user.hasAmusementPark = true;
  }

  attractionsCardEffect(user) {

  }
}

export class Port extends AttractionsCard {
  constructor() {
    super("port", 2);
  }

  toggleСardIndicator(user) {
    user.hasPort = true;
  }

  attractionsCardEffect(user) {

  }
}

export class RadioTower extends AttractionsCard {
  constructor() {
    super("radioTower", 22);
  }

  toggleСardIndicator(user) {
    user.hasRadioTower = true;
  }

  attractionsCardEffect(user) {

  }
}

export class ShoppingCenter extends AttractionsCard {
  constructor() {
    super("shoppingCenter", 10);
  }

  toggleСardIndicator(user) {
    user.hasShoppingCenter = true;
  }

  attractionsCardEffect(user) {
    user.hasShoppingCenter = true;
    const buildingsForWhichWeConsiderPayment = user.getAllUserCards().filter((card) => card.type === "cafe" || card.type === "shop");
    user.updateUserMoney(buildingsForWhichWeConsiderPayment.length);
  }
}


