import logMessage from "../../logger";
import {
  sendStartMessage,
  sendBuyMessage,
  sendHoldMessage,
  sendThrowCubeMessage,
  sendSwapCardsMessage,
  sendStealMessage,
  sendAcceptPortBonusMessage,
  sendRejectPortBonusMessage,
  sendAcceptThrowMessage,
} from "./machiCoroClientMessages";
import createBoard, { drawNewCard, hideStartGameButton, drawBoard } from "../../front/gameBoard";
import clientPlayer from "../../front/clientPlayer";

function printInfoAboutBuyAction() {
  return "it is your turn \n/buy name -> buy something;\n/hold - hold turn";
}

export function handlerServerMachiCoroResponse(jsonData) {
  logMessage("handlerServerMachiCoroResponse");
  logMessage(jsonData);
  const { method } = jsonData;
  switch (method) {
    case "gameStarted": {
      createBoard();
      hideStartGameButton();
      return "game was started";
    }
    case "startGameError": {
      return "error with game start";
    }
    case "userGameInfo": {
      // playerNum = uuid
      const userGameInfo = `get Info about this user from server\n
      You are Player ${jsonData.playerNum}
      User Money:${jsonData.money}\n
      Cards: ${jsonData.cards}
      ${jsonData.turn === "you" ? printInfoAboutBuyAction() : "it is turn of ".concat(jsonData.turn)}`;

      clientPlayer.getRegistrationData().cards = jsonData.cards;
      clientPlayer.getRegistrationData().money = jsonData.money;
      drawBoard();
      return userGameInfo;
    }
    case "throwCube": {
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
        drawNewCard(jsonData.buyResponse);
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
      const clPlArray = clientPlayer.getInfoAboutUsersInRoomArray();
      const info = result.reduce(
        (acc, userInfo) => {
          for (let i = 0; i < clPlArray.length; i += 1) {
            if (clPlArray[i].id === userInfo.index) {
              clPlArray[i].cards = userInfo.cards;
              clPlArray[i].money = userInfo.money;
              break;
            }
          }
          return acc.concat(`Player${userInfo.index}\n\t`)
            .concat(`cards:${userInfo.cards}\n\tmoney: ${userInfo.money}\n\n`);
        },
        "",
      );
      return info;
    }

    case "gameFinalStat": {
      return jsonData.content;
    }
    case "machiCoroRadioRequest": {
      return jsonData.content;
    }
    case "machiCoroPortRequest": {
      return jsonData.content;
    }
    case "machiCoroPortRadioRequest": {
      return jsonData.content;
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
