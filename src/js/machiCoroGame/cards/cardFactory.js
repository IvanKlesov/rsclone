import logMessage from "../../logger";
import { Longboat, Forest, WheatField, Trawler, Farm, FlowerGarden, Mine, AppleOrchard } from "./blueCards";
import { Store, FurnitureFactory, VegetableMarket, Bakery, GroceryWarehouse, CheeseDairy, FlowerStore } from "./greenCards";

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
