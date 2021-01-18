import logMessage from "../../logger";
import { machiCoroClientMessageMethods } from "../../../server/messages/machiCoroMessages/machiCoroClientMessageMethods";

function sendStartMessage(ws) {
  machiCoroClientMessageMethods.startGame(ws);
}

function sendBuyMessage(ws) {
  machiCoroClientMessageMethods.buy(ws);
}

export default function handleCliCommand(ws, command) {
  let currectCommand = command;
  if (currectCommand[0] === "/") {
    currectCommand = currectCommand.slice(1);
  }
  switch (currectCommand) {
    case "start": {
      logMessage("start game command from client");
      sendStartMessage(ws);
      break;
    }
    case "buy": {
      logMessage("buy command from client");
      sendBuyMessage(ws);
      break;
    }
    case "help": {
      logMessage("help command from client");
      break;
    }
    default: {
      logMessage("cant response command from client");
      logMessage("command was: ".concat(currectCommand));
      break;
    }
  }
}
