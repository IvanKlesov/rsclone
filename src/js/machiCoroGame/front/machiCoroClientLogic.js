import logMessage from "../../logger";
import { machiCoroClientMessageMethods } from "../back/machiCoroMessages/machiCoroClientMessageMethods";

function sendStartMessage(ws, roomID) {
  machiCoroClientMessageMethods.startGame(ws, roomID);
}

function sendBuyMessage(ws, roomID) {
  machiCoroClientMessageMethods.buy(ws, roomID);
}

function sendHoldMessage(ws, roomID) {
  machiCoroClientMessageMethods.hold(ws, roomID);
}

function sendThrowCubeMessage(ws, roomID, cubeNumbs) {
  machiCoroClientMessageMethods.throw(ws, roomID, cubeNumbs);
}

function printInfoAboutBuyAction() {
  return "it is your turn \n/buy name -> buy something;\n/hold - hold turn";
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
      You are Player ${jsonData.playerNum}
      User Money:${jsonData.money}\n
      Cards: ${jsonData.cards}
      ${jsonData.turn === "you" ? printInfoAboutBuyAction() : "it is turn of ".concat(jsonData.turn)}`;
      return userGameInfo;
    }
    case "throwCube": {
      // const throwResult = "";
      logMessage("throwCubeResult handled");
      const point = jsonData.throwCubeResult;
      if (jsonData.turn === "you") {
        return `You throw ${point}`;
      } else {
        const activePlayerNum = jsonData.turn
        return `Player ${activePlayerNum} throw ${point}`;
      }
    }

  }
  return "";
}

export default function handleCliCommand(ws, command, roomID) {
  let currectCommand = command;
  if (currectCommand[0] === "/") {
    currectCommand = currectCommand.slice(1);
  }
  currectCommand = currectCommand.split(" ", 2);
  switch (currectCommand[0]) {
    case "start": {
      logMessage("start game command from client");
      sendStartMessage(ws, roomID);
      break;
    }
    case "buy": {
      logMessage("buy command from client");
      logMessage(currectCommand[1]);
      sendBuyMessage(ws, roomID);
      break;
    }
    case "hold": {
      sendHoldMessage(ws, roomID);
      break;
    }
    case "help": {
      logMessage("help command from client");
      logMessage("start = will start Machi Coro Game");
      break;
    }
    case "throw": {
      sendThrowCubeMessage(ws, roomID, 1);
      break;
    }
    case "throw2": {
      sendThrowCubeMessage(ws, roomID, 2);
      break;
    }
    default: {
      logMessage("cant response command from client");
      logMessage("command was: ".concat(currectCommand));
      break;
    }
  }
}
