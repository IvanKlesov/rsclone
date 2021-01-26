import logMessage from "../../../logger";

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
      logMessage();
      room.machiCoroGameBuy(ws, data.buyRequest)
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
    case "swap": {
      logMessage("machiCoroHandler swap");
      room.machiCoroGameSwapUserCards(ws, data.secondUser, data.firstUserCard, data.secondUserCard);
      break;
    }
    case "steal": {
      logMessage("machiCoroHandler steal");
      room.machiCoroGameSteal(ws, data.secondUser);
      break;
    }
    case "acceptPortBonus": {
      logMessage("machiCoroHandler acceptPortBonus");
      room.machiCoroGamePortBonusResult(ws, "accept");
      break;
    }
    case "rejectPortBonus": {
      logMessage("machiCoroHandler rejectPortBonus");
      room.machiCoroGamePortBonusResult(ws, "reject");
      break;
    }
    case "acceptThrow" :{
      logMessage("machiCoroHandler acceptThrow");
      room.machiCoroGameAcceptThrow(ws);
      break;
    }
    default: {
      return false;
    }
  }

  return true;
}
