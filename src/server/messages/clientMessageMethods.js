export const clientMessageMethods = {
  // "message": "clientMessage",
  // "getRooms": "getRooms",
  // "setRoom": "setRoom",

};

clientMessageMethods.sendMessage = (webSocket, message, roomID) => {
  console.log("sentMessageMethod");
  const clientMessage = {
    "method": "message",
    "content": message,
    roomID: roomID,
  }
  webSocket.send(JSON.stringify(clientMessage));
};

clientMessageMethods.getRooms = (webSocket) => {
  console.log("getRoomsMethod");
  const getRoomsMsg = {
    "method": "getRooms",
  }
  webSocket.send(JSON.stringify(getRoomsMsg));
};

clientMessageMethods.setRoom = (webSocket, id) => {
  console.log("setRoomMethod");
  const clientMessage = {
    "method": "setRoom",
    "content": id,
  }
  webSocket.send(JSON.stringify(clientMessage));
};

export default clientMessageMethods;