import logMessage from "../../js/logger";

export const clientMessageMethods = {};

clientMessageMethods.sendMessage = (webSocket, message, roomID) => {
  logMessage("sentMessageMethod");
  const clientMessage = {
    method: "message",
    content: message,
    roomID,
  };
  webSocket.send(JSON.stringify(clientMessage));
};

clientMessageMethods.registerUser = (webSocket, userID, userName, userPhotoAdress) => {
  const ititialMessage = {
    method: "registerUser",
    userID,
    userName,
    userPhotoAdress,
  };
  webSocket.send(JSON.stringify(ititialMessage));
};

clientMessageMethods.getRooms = (webSocket) => {
  logMessage("getRoomsMethod");
  const getRoomsMsg = {
    method: "getRooms",
  };
  webSocket.send(JSON.stringify(getRoomsMsg));
};

clientMessageMethods.setRoom = (webSocket, id) => {
  logMessage("setRoomMethod");
  const clientMessage = {
    method: "setRoom",
    content: id,
  };
  webSocket.send(JSON.stringify(clientMessage));
};

clientMessageMethods.getOutRoom = (webSocket, id) => {
  logMessage("get out room method");
  const clientMessage = {
    method: "getOutRoom",
    content: id,
  };
  webSocket.send(JSON.stringify(clientMessage));
};

clientMessageMethods.createRoom = (webSocket, roomName) => {
  logMessage("createRoom method");
  const clientMessage = {
    method: "createRoom",
    content: roomName,
  };
  webSocket.send(JSON.stringify(clientMessage));
};

export default clientMessageMethods;
