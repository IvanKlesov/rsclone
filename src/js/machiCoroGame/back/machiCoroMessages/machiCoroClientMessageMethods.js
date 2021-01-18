export const machiCoroClientMessageMethods = {};

export const messageMethodsName = [];

messageMethodsName.push("startGame");
machiCoroClientMessageMethods.startGame = (webSocket, roomID) => {
  const clientMessage = {
    method: "startGame",
    roomID,
  };
  webSocket.send(JSON.stringify(clientMessage));
};

messageMethodsName.push("buy");
machiCoroClientMessageMethods.buy = (webSocket) => {
  const clientMessage = {
    method: "buy",
  };
  webSocket.send(JSON.stringify(clientMessage));
};

export default machiCoroClientMessageMethods;
