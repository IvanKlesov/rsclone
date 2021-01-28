import logMessage from "../../logger";
import { machiCoroClientMessageMethods } from "../back/machiCoroMessages/machiCoroClientMessageMethods";

function sendStartMessage(ws, roomID) {
  machiCoroClientMessageMethods.startGame(ws, roomID);
}

function sendBuyMessage(ws, roomID, willBuy) {
  machiCoroClientMessageMethods.buy(ws, roomID, willBuy);
}

function sendHoldMessage(ws, roomID) {
  machiCoroClientMessageMethods.hold(ws, roomID);
}

function sendThrowCubeMessage(ws, roomID, cubeNumbs) {
  machiCoroClientMessageMethods.throw(ws, roomID, cubeNumbs);
}

function sendSwapCardsMessage(ws, roomID, commandString) {
  const commandStringSplit = commandString.split(" ");
  if (commandString.length < 4) {
    logMessage("error sendSwapCardsMessage: command lenght < 4");
    return;
  }

  const secondUserID = commandStringSplit[1];
  const firstUserCard = commandStringSplit[2];
  const secondUserCasrd = commandStringSplit[3];
  logMessage(`secondUserID ${secondUserID}`);
  logMessage(`firstUserCard ${firstUserCard}`);
  logMessage(`secondUserCasrd ${secondUserCasrd}`);
  machiCoroClientMessageMethods.swap(ws, roomID, secondUserID, firstUserCard, secondUserCasrd);
}

function sendStealMessage(ws, roomID, secondUserID) {
  machiCoroClientMessageMethods.steal(ws, roomID, secondUserID);
}

function sendAcceptPortBonusMessage(ws, roomID) {
  machiCoroClientMessageMethods.acceptPortBonus(ws, roomID);
}

function sendRejectPortBonusMessage(ws, roomID) {
  machiCoroClientMessageMethods.rejectPortBonus(ws, roomID);
}

function sendAcceptThrowMessage(ws, roomID) {
  machiCoroClientMessageMethods.acceptThrow(ws, roomID);
}

function printInfoAboutBuyAction() {
  return "it is your turn \n/buy name -> buy something;\n/hold - hold turn";
}

export function handlerServerMachiCoroResponse(jsonData) {
  logMessage("handlerServerMachiCoroResponse");
  logMessage(jsonData);
  const { method } = jsonData;
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
      }
      const activePlayerNum = jsonData.turn;
      return `Player ${activePlayerNum} throw ${point}`;
    }
    case "purchaseInfo": {
      const itIsYourTurn = jsonData.turn === "you";
      if (itIsYourTurn) {
        return `It is Your turn.You buy ${jsonData.buyResponse}`;
      }
      return `It is turn of player${jsonData.turn}. Player${jsonData.turn} buy ${jsonData.buyResponse}`;
    }
    case "machiCoroError": {
      return jsonData.content;
    }
    case "swapAccept": {
      return jsonData.content;
    }

    case "stealAccept": {
      return jsonData.content;
    }

    case "allUsersInfo": {
      const result = jsonData.content;
      const info = result
        .reduce((acc, userInfo) => (
          acc.concat(`Player${userInfo.index}\n\t`).concat(`cards:${userInfo.cards}\n\tmoney: ${userInfo.money}\n\n`)
        ), "");
      return info;
    }

    default: {
      break;
    }
  }
  return "";
}

export default function handleCliCommand(ws, command, roomID) {
  let currectCommand = command;
  if (currectCommand[0] === "/") {
    currectCommand = currectCommand.slice(1);
  }
  const commandMethod = currectCommand.split(" ", 2);
  switch (commandMethod[0]) {
    case "start": {
      logMessage("start game command from client");
      sendStartMessage(ws, roomID);
      break;
    }
    case "buy": {
      logMessage("buy command from client");
      const userTryBuyThisThing = commandMethod[1];
      logMessage(userTryBuyThisThing);
      sendBuyMessage(ws, roomID, userTryBuyThisThing);
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

    case "swap": {
      sendSwapCardsMessage(ws, roomID, currectCommand);
      break;
    }
    case "steal": {
      sendStealMessage(ws, roomID, commandMethod[1]);
      break;
    }
    case "acceptPortBonus": {
      sendAcceptPortBonusMessage(ws, roomID);
      break;
    }
    case "rejectPortBonus": {
      sendRejectPortBonusMessage(ws, roomID);
      break;
    }
    case "acceptThrow": {
      sendAcceptThrowMessage(ws, roomID);
      break;
    }
    default: {
      logMessage("cant response command from client");
      logMessage("command was: ".concat(commandMethod));
      break;
    }
  }
}
