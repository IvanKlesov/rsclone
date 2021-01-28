import logMessage from "../../../logger";
import getDateDifferenceInTime from "../../../time";

export const machiCoroServerMessageMethods = {};

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
  const curActiveUserIndex = users.findIndex((user) => user === curActiveUser);
  users.forEach((user, index) => {
    const userWs = user.getWs();
    const userGameData = user.getGameInfo();
    userGameData.method = "userGameInfo";
    if (user === curActiveUser) {
      userGameData.turn = "you";
      userGameData.playerNum = curActiveUserIndex;
    } else {
      userGameData.turn = curActiveUserIndex;
      userGameData.playerNum = index;
    }
    userWs.send(JSON.stringify(userGameData));
  });
};

machiCoroServerMessageMethods.sendAllOtherUserGameInfo = (users) => {
  users.forEach((user, idx) => {
    let otherUsersInfo = users.map((user, index) => {
      const info = {
        index,
        money: user.getMachiCoroUser().money,
        cards: user.getMachiCoroUser().userCards.map((card) => card.name),
      };
      return info;
    });
    otherUsersInfo = otherUsersInfo.filter((userInfo) => userInfo.index !== idx);
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
      message.turn = curActiveUserIndex;
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
      message.turn = curActiveUserIndex;
    }
    userWs.send(JSON.stringify(message));
  });
};

machiCoroServerMessageMethods.swapAccept = (users, activeUserID, secondUserID, firstUserCardName, secondUserCardName) => {
  const message = {
    method: "swapAccept",
    content: `player${activeUserID} swap ${firstUserCardName} with player${secondUserID} ${secondUserCardName}`,
  };

  const messageToActiveUser = {
    method: "swapAccept",
    content: `you swap ${firstUserCardName} with player${secondUserID} ${secondUserCardName}`,
  };

  const messageToSecondUser = {
    method: "swapAccept",
    content: `player${activeUserID} swap ${firstUserCardName} with you ${secondUserCardName}`,
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
    content: `player${activeUserID} steal money(5) from player${secondUserID}`,
  };

  const messageToActiveUser = {
    method: "stealAccept",
    content: `you steal money(5) from player${secondUserID}`,
  };

  const messageToSecondUser = {
    method: "stealAccept",
    content: `player${activeUserID} steal with your money(5)`,
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

machiCoroServerMessageMethods.portBonusResult = (users, curActiveUserID, result) => {
  // scratch. Fix it in future
  const messageToALlUsers = {
    method: "machiCoroError",
    content: `player${curActiveUserID} ${result} portBonus`,
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
  const messageToWinner = {
    method: "machiCoroError",
    content: "You are game winner",
  };

  const messageToLosser = {
    method: "machiCoroError",
    content: `You loose this game. Player${indexOfWinner} win this game`,
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
  const timeMessage = `Game lasted ${timeDiff.hours} hours : ${timeDiff.minutes} minutes: ${timeDiff.seconds} seconds.`;
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

export default machiCoroServerMessageMethods;
