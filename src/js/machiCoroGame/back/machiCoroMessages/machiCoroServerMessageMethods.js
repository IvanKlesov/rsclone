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

machiCoroServerMessageMethods.sendUserGameInfo = (users) => {
  users.forEach((user) => {
    const userWs = user.getWs();
    const userGameData = user.getGameInfo();
    userGameData.method = "userGameInfo";
    userWs.send(JSON.stringify(userGameData));
  })
};

export default machiCoroServerMessageMethods;
