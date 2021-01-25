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
      userGameData.turn = curActiveUserIndex;/* curActiveUser.getUserID() */;
      userGameData.playerNum = index;
    }
    userWs.send(JSON.stringify(userGameData));
  })
};

machiCoroServerMessageMethods.sendResultOfThrowCube = (users, curActiveUserIndex, throwCubeResult) => {
  users.forEach((user, index) => {
    const userWs = user.getWs();
    const message = {
      method: "throwCube",
      throwCubeResult
    };
    if (curActiveUserIndex === index) {
      message.turn = "you";
    } else {
      message.turn = curActiveUserIndex;
    }
    userWs.send(JSON.stringify(message));
  });
}

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
}

machiCoroServerMessageMethods.swapAccept = (users, activeUserID, secondUserID, firstUserCardName, secondUserCardName) => {
  const message = {
    method: "swapAccept",
    content: `player${activeUserID} swap ${firstUserCardName} with player${secondUserID} ${secondUserCardName}`,
  }

  const messageToActiveUser = {
    method: "swapAccept",
    content: `you swap ${firstUserCardName} with player${secondUserID} ${secondUserCardName}`,
  }

  const messageToSecondUser = {
    method: "swapAccept",
    content: `player${activeUserID} swap ${firstUserCardName} with you ${secondUserCardName}`,
  }
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
}

machiCoroServerMessageMethods.stealAccept = (users, activeUserID, secondUserID) => {
  // duplicating
  const message = {
    method: "stealAccept",
    content: `player${activeUserID} steal money(5) from player${secondUserID}`,
  }

  const messageToActiveUser = {
    method: "stealAccept",
    content: `you steal money(5) from player${secondUserID}`,
  }

  const messageToSecondUser = {
    method: "stealAccept",
    content: `player${activeUserID} steal with your money(5)`,
  }

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
}

machiCoroServerMessageMethods.sendError = (ws, errorMessage) => {
  const message = {
    method: "machiCoroError",
    content: errorMessage
  }
  ws.send(JSON.stringify(message));
}

export default machiCoroServerMessageMethods;
