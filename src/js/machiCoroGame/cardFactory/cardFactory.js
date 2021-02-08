import logMessage from "../../logger";
import {
  Longboat, Forest, WheatField, Trawler, Farm, FlowerGarden, Mine, AppleOrchard,
} from "./cards/blueCards";
import {
  Store, FurnitureFactory, VegetableMarket, Bakery, GroceryWarehouse, CheeseDairy, FlowerStore,
} from "./cards/greenCards";
import {
  Diner, Cafe, Pizzeria, Restaurant, SushiBar,
} from "./cards/redCards";
import {
  BusinessCenter, PublishingHouse, Tax, Stadium, Telecentre,
} from "./cards/purpleCards";
import {
  Airport, RailwayStation, AmusementPark, Port, RadioTower, ShoppingCenter,
} from "./cards/attractionsCards";

export const cardFactory = (cardName) => {
  switch (cardName) {
    // blue
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
    // red
    // red cards give money to owner from opponent cash

    case "diner": {
      return new Diner();
    }

    case "cafe": {
      return new Cafe();
    }

    case "pizzeria": {
      return new Pizzeria();
    }

    case "restaurant": {
      return new Restaurant();
    }

    case "sushiBar": {
      return new SushiBar();
    }

    // purple
    // red cards give money to owner in owner turn from opponent cash

    case "businessCenter": {
      return new BusinessCenter();
    }

    case "publishingHouse": {
      return new PublishingHouse();
    }

    case "tax": {
      return new Tax();
    }

    case "stadium": {
      return new Stadium();
    }

    case "telecentre": {
      return new Telecentre();
    }

    // attraction cards

    case "airport": {
      return new Airport();
    }

    case "railwayStation": {
      return new RailwayStation();
    }

    case "amusementPark": {
      return new AmusementPark();
    }

    case "port": {
      return new Port();
    }

    case "radioTower": {
      return new RadioTower();
    }

    case "shoppingCenter": {
      return new ShoppingCenter();
    }

    default: {
      break;
    }
  }
};

export default cardFactory;
