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

export default machiCoroServerMessageMethods;
