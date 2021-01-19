import logMessage from "../../logger";
import { machiCoroClientMessageMethods } from "../back/machiCoroMessages/machiCoroClientMessageMethods";

function sendStartMessage(ws, roomID) {
  machiCoroClientMessageMethods.startGame(ws, roomID);
}

function sendBuyMessage(ws) {
  machiCoroClientMessageMethods.buy(ws);
}

export function handlerServerMachiCoroResponse(jsonData) {
  logMessage("handlerServerMachiCoroResponse");
  logMessage(jsonData);
  const method = jsonData.method;
  switch (method) {
    case "gameStarted": {
      return "game was started";
    }
    case "startGameError": {
      return "error with game start";
    }

    case "userGameInfo": {
      const userGameInfo = `get Info about this user from server\n
      User Money:${jsonData.money}`;
      return userGameInfo;
    }
  }
  return "";
}

export default function handleCliCommand(ws, command, roomID) {
  let currectCommand = command;
  if (currectCommand[0] === "/") {
    currectCommand = currectCommand.slice(1);
  }
  switch (currectCommand) {
    case "start": {
      logMessage("start game command from client");
      sendStartMessage(ws, roomID);
      break;
    }
    case "buy": {
      logMessage("buy command from client");
      sendBuyMessage(ws);
      break;
    }
    case "help": {
      logMessage("help command from client");
      logMessage("start = will start Machi Coro Game");
      break;
    }
    default: {
      logMessage("cant response command from client");
      logMessage("command was: ".concat(currectCommand));
      break;
    }
  }
}
