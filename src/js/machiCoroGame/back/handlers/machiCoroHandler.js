import logMessage from "../../../logger";
// import { messageMethodsName } from "../machiCoroMessages/machiCoroClientMessageMethods";
import machiCoroServerMessageMethods from "../machiCoroMessages/machiCoroServerMessageMethods";

const NEED_USERS_FOR_GAME_START = 1;

/* export function checkMethodExistence(methodName) {
  logMessage("machiCoroServerMessageMethods checkMethodExistence. methodName = ".concat(methodName));
  if (messageMethodsName.indexOf(methodName) > -1) {
    logMessage("this method exist");
    return true;
  }
  logMessage("this method doesn't exist");
  return false;
}; */

export function machiCoroHandler(command, ws, room, webSocketOpetState) {
  switch (command) {
    case "startGame": {
      logMessage("machiCoroHandler startGame");
      logMessage(room);
      if ((room.getOwner() && ws === room.getOwner()) ||
        (room.getOwner() === undefined && room.clients().length > NEED_USERS_FOR_GAME_START)) {
        room.startMachiCoroGame();
        machiCoroServerMessageMethods.gameStarted(room, ws, webSocketOpetState);
      }
      break;
    }
    case "buy": {
      logMessage("machiCoroHandler buy");
      break;
    }
    default: {
      return false;
    }
  }

  return true;
}
