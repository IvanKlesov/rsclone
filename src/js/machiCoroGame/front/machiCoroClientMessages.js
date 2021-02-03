import logMessage from "../../logger";
import { machiCoroClientMessageMethods } from "../back/machiCoroMessages/machiCoroClientMessageMethods";
import { opponentsUUID } from "../../front/gameBoardConsts";

export function sendStartMessage(ws, roomID) {
  machiCoroClientMessageMethods.startGame(ws, roomID);
}

export function sendBuyMessage(ws, roomID, willBuy) {
  machiCoroClientMessageMethods.buy(ws, roomID, willBuy);
}

export function sendHoldMessage(ws, roomID) {
  machiCoroClientMessageMethods.hold(ws, roomID);
}

export function sendThrowCubeMessage(ws, roomID, cubeNumbs) {
  machiCoroClientMessageMethods.throw(ws, roomID, cubeNumbs);
}

export function sendSwapCardsMessage(ws, roomID, commandString) {
  const commandStringSplit = commandString.split(" ");
  if (commandString.length < 4) {
    logMessage("error sendSwapCardsMessage: command lenght < 4");
    return;
  }

  const secondUserID = commandStringSplit[1];
  if (secondUserID < 0 || secondUserID - 1 >= 3) {
    return;
  }
  const firstUserCard = commandStringSplit[2];
  const secondUserCasrd = commandStringSplit[3];
  logMessage(`secondUserID ${secondUserID}`);
  logMessage(`firstUserCard ${firstUserCard}`);
  logMessage(`secondUserCasrd ${secondUserCasrd}`);
  machiCoroClientMessageMethods.swap(ws, roomID, opponentsUUID[secondUserID - 1], firstUserCard, secondUserCasrd);
}

export function sendStealMessage(ws, roomID, secondUserID) {
  if (secondUserID < 0 || secondUserID - 1 >= 3) {
    return;
  }
  machiCoroClientMessageMethods.steal(ws, roomID, opponentsUUID[secondUserID - 1]);
}

export function sendAcceptPortBonusMessage(ws, roomID) {
  machiCoroClientMessageMethods.acceptPortBonus(ws, roomID);
}

export function sendRejectPortBonusMessage(ws, roomID) {
  machiCoroClientMessageMethods.rejectPortBonus(ws, roomID);
}

export function sendAcceptThrowMessage(ws, roomID) {
  machiCoroClientMessageMethods.acceptThrow(ws, roomID);
}
