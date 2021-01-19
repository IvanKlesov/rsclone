import logMessage from "../../../logger";
// import machiCoroServerMessageMethods from "../machiCoroMessages/machiCoroServerMessageMethods";

const NEED_USERS_FOR_GAME_START = 2;

export function machiCoroHandler(command, ws, room, webSocketOpetState) {
  switch (command) {
    case "startGame": {
      logMessage("machiCoroHandler startGame");
      logMessage(room);
      if ((room.getOwner() && ws === room.getOwner()) ||
        (room.getOwner() === undefined && room.clients().length >= NEED_USERS_FOR_GAME_START)) {
        room.startMachiCoroGame(ws, webSocketOpetState);
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
