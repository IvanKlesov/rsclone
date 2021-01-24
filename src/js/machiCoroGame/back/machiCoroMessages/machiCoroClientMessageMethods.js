export const machiCoroClientMessageMethods = {};

machiCoroClientMessageMethods.startGame = (webSocket, roomID) => {
  const clientMessage = {
    method: "startGame",
    roomID,
  };
  webSocket.send(JSON.stringify(clientMessage));
};

machiCoroClientMessageMethods.buy = (webSocket, roomID, buyRequest) => {
  const clientMessage = {
    method: "buy",
    roomID,
    buyRequest,
  };
  webSocket.send(JSON.stringify(clientMessage));
};

machiCoroClientMessageMethods.hold = (webSocket, roomID) => {
  const clientMessage = {
    method: "hold",
    roomID,
  };
  webSocket.send(JSON.stringify(clientMessage));
}

machiCoroClientMessageMethods.throw = (webSocket, roomID, cubeNumbers = 1) => {
  const clientMessage = {
    method: "throw",
    roomID,
    cubeNumbers,
  };
  webSocket.send(JSON.stringify(clientMessage));
}

machiCoroClientMessageMethods.swap = (webSocket, roomID, secondUser, firstUserCard, secondUserCard) => {
  const clientMessage = {
    method: "swap",
    roomID,
    secondUser,
    firstUserCard,
    secondUserCard
  };
  webSocket.send(JSON.stringify(clientMessage));
}

export default machiCoroClientMessageMethods;
