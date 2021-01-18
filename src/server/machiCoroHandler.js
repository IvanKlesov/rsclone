import logMessage from "../js/logger";
import { messageMethodsName } from "./messages/machiCoroMessages/machiCoroClientMessageMethods";

export function checkMethodExistence(methodName) {
  logMessage("machiCoroServerMessageMethods checkMethodExistence. methodName = ".concat(methodName));
  if (messageMethodsName.indexOf(methodName) > -1) {
    logMessage("this method exist");
    return true;
  }
  logMessage("this method doesn't exist");
  return false;
};


export function machiCoroHandler(command, ws) {
  switch (command) {
    case "startGame": {
      logMessage("machiCoroHandler startGame");
      break;
    }
    case "buy": {
      logMessage("machiCoroHandler buy");
      break;
    }
  }
}