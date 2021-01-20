export const machiCoroClientMessageMethods = {};

machiCoroClientMessageMethods.startGame = (webSocket, roomID) => {
  const clientMessage = {
    method: "startGame",
    roomID,
  };
  webSocket.send(JSON.stringify(clientMessage));
};

machiCoroClientMessageMethods.buy = (webSocket, roomID) => {
  const clientMessage = {
    method: "buy",
    roomID,
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

export default machiCoroClientMessageMethods;
