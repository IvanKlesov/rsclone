import logMessage from "../../../logger";
import getDateDifferenceInTime from "../../../time";

export const machiCoroServerMessageMethods = {};

const messageToWinner = {
  method: "machiCoroWin",
  content: "You are game winner",
};

const RADIO_BONUS_MESSAGE = "You have card radiTower.You can rethrow cubes."
  .concat("To rethrow send /throw. To accept current result")
  .concat(" send /acceptThrow command");

const PORT_BONUS_MESSAGE = "You have card port.You can get 2 throw point bonus.".concat(
  "Send /acceptPortBonus or /rejectPortBonus command",
);

const PORT_RADIO_BONUS_MESSAGE = "You have card radiTower.You can rethrow cubes. To rethrow send /throw.".concat(
  "To accept current result send /acceptThrow command.Also you can rethrow cube(s)",
);

// users = array of User objects
machiCoroServerMessageMethods.gameStarted = (users, webSocket, webSocketOpetState) => {
  const serverMessage = {
    method: "gameStarted",
  };

  let allUsersActive = true;
  users.forEach((user) => {
    const userWs = user.getWs();
    if (userWs.readyState !== webSocketOpetState) {
      allUsersActive = false;
    }
  });
  if (allUsersActive) {
    users.forEach((user) => {
      const userWs = user.getWs();
      userWs.send(JSON.stringify(serverMessage));
    });
  } else {
    serverMessage.method = "startGameError";
    webSocket.send(JSON.stringify(serverMessage));
  }
};

// refactor = > curActiveUser change to curActiveUserIndex
machiCoroServerMessageMethods.sendUserGameInfo = (users, curActiveUser) => {
  // const curActiveUserIndex = users.findIndex((user) => user === curActiveUser);
  const curActiveUserIndex = curActiveUser.getUserID(); //= users.find((user) => user === curActiveUser).getUserID();
  users.forEach((user, index) => {
    const userWs = user.getWs();
    const userGameData = user.getGameInfo();
    userGameData.method = "userGameInfo";
    if (user === curActiveUser) {
      userGameData.turn = "you";
      userGameData.playerNum = curActiveUserIndex;
    } else {
      userGameData.turn = curActiveUserIndex;
      userGameData.playerNum = user.getUserID();
    }
    userWs.send(JSON.stringify(userGameData));
  });
};

machiCoroServerMessageMethods.sendAllOtherUserGameInfo = (users) => {
  users.forEach((user, idx) => {
    let otherUsersInfo = users.map((user2) => {
      const info = {
        index: user2.getUserID(),
        money: user2.getMachiCoroUser().money,
        cards: user2.getMachiCoroUser().userCards.map((card) => card.name),
      };
      return info;
    });
    otherUsersInfo = otherUsersInfo.filter((userInfo) => userInfo.index !== user.getUserID());
    const message = {
      method: "allUsersInfo",
      content: otherUsersInfo,
    };
    user.getWs().send(JSON.stringify(message));
  });
};

machiCoroServerMessageMethods.sendResultOfThrowCube = (users, curActiveUserIndex, throwCubeResult) => {
  users.forEach((user, index) => {
    const userWs = user.getWs();
    const message = {
      method: "throwCube",
      throwCubeResult,
    };
    if (curActiveUserIndex === index) {
      message.turn = "you";
    } else {
      message.turn = user.getUserID();
    }
    userWs.send(JSON.stringify(message));
  });
};

machiCoroServerMessageMethods.sendPurchaseInfo = (users, curActiveUserIndex, buyResponse) => {
  users.forEach((user, index) => {
    const userWs = user.getWs();
    const message = {
      method: "purchaseInfo",
      buyResponse,
    };
    if (curActiveUserIndex === index) {
      message.turn = "you";
    } else {
      message.turn = user.getUserID();
    }
    userWs.send(JSON.stringify(message));
  });
};

machiCoroServerMessageMethods.swapAccept = ( users, activeUserID, secondUserID, firstUserCardName, secondUserCardName) => {
  const message = {
    method: "swapAccept",
    content: `player${users[activeUserID].getUserID()} swap ${firstUserCardName}`.concat(
      `with player${users[secondUserID].getUserID()} ${secondUserCardName}`,
    ),
  };

  const messageToActiveUser = {
    method: "swapAccept",
    content: `you swap ${firstUserCardName} with player${users[secondUserID].getUserID()} ${secondUserCardName}`,
  };

  const messageToSecondUser = {
    method: "swapAccept",
    content: `player${users[activeUserID].getUserID()} swap ${firstUserCardName} with you ${secondUserCardName}`,
  };
  users.forEach((user, idx) => {
    const curUserWs = user.getWs();
    if (idx === activeUserID) {
      curUserWs.send(JSON.stringify(messageToActiveUser));
    } else if (idx === secondUserID) {
      curUserWs.send(JSON.stringify(messageToSecondUser));
    } else {
      curUserWs.send(JSON.stringify(message));
    }
  });
};

machiCoroServerMessageMethods.stealAccept = (users, activeUserID, secondUserID) => {
  // duplicating
  const message = {
    method: "stealAccept",
    content: `player${users[activeUserID].getUserID()} steal money(5) from player${secondUserID}`,
  };

  const messageToActiveUser = {
    method: "stealAccept",
    content: `you steal money(5) from player${secondUserID}`,
  };

  const messageToSecondUser = {
    method: "stealAccept",
    content: `player${users[activeUserID].getUserID()} steal with your money(5)`,
  };

  users.forEach((user, idx) => {
    const curUserWs = user.getWs();
    if (idx === activeUserID) {
      curUserWs.send(JSON.stringify(messageToActiveUser));
    } else if (user.getUserID() === secondUserID) {
      curUserWs.send(JSON.stringify(messageToSecondUser));
    } else {
      curUserWs.send(JSON.stringify(message));
    }
  });
};

machiCoroServerMessageMethods.portBonusResult = (users, curActiveUserID, result) => {
  // scratch. Fix it in future
  const messageToALlUsers = {
    method: "machiCoroError",
    content: `player ${users[curActiveUserID].getUserID()} ${result} portBonus`,
  };

  const messageToActiveUser = {
    method: "machiCoroError",
    content: `You ${result} portBonus`,
  };
  users.forEach((user, index) => {
    const curUserWs = user.getWs();
    if (index === curActiveUserID) {
      curUserWs.send(JSON.stringify(messageToActiveUser));
    } else {
      curUserWs.send(JSON.stringify(messageToALlUsers));
    }
  });
};

machiCoroServerMessageMethods.sendGameIsOverMessage = (users, winner) => {
  const indexOfWinner = users.findIndex((user) => user === winner);
  logMessage("winner index: ", indexOfWinner);

  const messageToLosser = {
    method: "machiCoroLose",
    content: `You loose this game. Player ${winner.getUserID()} win this game`,
  };

  users.forEach((user, index) => {
    if (indexOfWinner === index) {
      user.getWs().send(JSON.stringify(messageToWinner));
    } else {
      user.getWs().send(JSON.stringify(messageToLosser));
    }
  });
};

machiCoroServerMessageMethods.sendGameFinalStat = (users, gameStartObj, gameEndObj) => {
  const timeDiff = getDateDifferenceInTime(gameStartObj, gameEndObj);
  const timeMessage = `Game lasted ${timeDiff.hours} hours : ${timeDiff.minutes}`.concat(
    `minutes: ${timeDiff.seconds} seconds.`,
  );
  const message = {
    method: "gameFinalStat",
  };
  users.forEach((user) => {
    const machiCoroUser = user.getMachiCoroUser();
    const userScore = machiCoroUser.getAllUserCards().reduce((acc, card) => acc + card.cost, 0) + machiCoroUser.getMoney();
    message.content = timeMessage.concat(`Your score: ${userScore}.`);
    user.getWs().send(JSON.stringify(message));
  });
};

machiCoroServerMessageMethods.sendError = (ws, errorMessage) => {
  const message = {
    method: "machiCoroError",
    content: errorMessage,
  };
  ws.send(JSON.stringify(message));
};

machiCoroServerMessageMethods.sendRequestForRadioBonusAccept = (ws) => {
  const message = {
    method: "machiCoroRadioRequest",
    content: RADIO_BONUS_MESSAGE,
  };
  ws.send(JSON.stringify(message));
};

machiCoroServerMessageMethods.sendRequestForPortBonusAccept = (ws) => {
  const message = {
    method: "machiCoroPortRequest",
    content: PORT_BONUS_MESSAGE,
  };
  ws.send(JSON.stringify(message));
};

machiCoroServerMessageMethods.sendRequestForPortRadioBonusAccept = (ws) => {
  const message = {
    method: "machiCoroPortRadioRequest",
    content: PORT_RADIO_BONUS_MESSAGE,
  };
  ws.send(JSON.stringify(message));
};

export default machiCoroServerMessageMethods;
