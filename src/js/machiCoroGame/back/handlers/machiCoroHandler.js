import logMessage from "../../../logger";
// import machiCoroServerMessageMethods from "../machiCoroMessages/machiCoroServerMessageMethods";

const NEED_USERS_FOR_GAME_START = 2;

export function machiCoroHandler(data, ws, room, webSocketOpetState) {
  const command = data.method;
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
      logMessage(room);
      break;
    }
    case "hold": {
      console.log(room);
      logMessage("get hold message");
      room.machiCoroGameHold(ws);
      break;
    }
    case "throw": {
      logMessage("get throwMessage");
      logMessage(room);
      room.machiCoroGameThrowCube(ws, data.cubeNumbers);
      break;
    }
    default: {
      return false;
    }
  }

  return true;
}
