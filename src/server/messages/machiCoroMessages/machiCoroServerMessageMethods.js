export const machiCoroServerMessageMethods = {};

machiCoroServerMessageMethods.gameStarted = (curRoom, webSocket, webSocketOpetState) => {
  const serverMessage = {
    method: "gameStarted",
  };

  let allUsersActive = true;
  curRoom.clients().forEach((client) => {
    if (client.readyState !== webSocketOpetState) {
      allUsersActive = false;
    }
  });
  if (allUsersActive) {
    curRoom.clients().forEach((client) => {
      client.send(JSON.stringify(serverMessage));
    });
  } else {
    serverMessage.method = "startGameError";
    webSocket.send(JSON.stringify(serverMessage));
  }
};

export default machiCoroServerMessageMethods;
