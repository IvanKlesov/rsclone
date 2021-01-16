export const serverMessageMethods = {
  // "message": "serverMessage",
  // "rooms": "rooms",
};

serverMessageMethods.sendRooms = (webSocket, roomsArray) => {
  console.log("serverMessageMethods.sendRooms:");
  console.log(roomsArray);
  const responseRooms = {
    method: "rooms",
    content: roomsArray.map(room => room.name.concat(`__id${room.id}`)),
  }
  const response = JSON.stringify(responseRooms);
  webSocket.send(response);
}

serverMessageMethods.sendMessage = (curRoom, webSocket, jsonFromClient, webSocketOpetState) => {
  const serverMessage = {
    "method": "message",
    "content": jsonFromClient.content,
  };
  curRoom.clients().forEach((client) => {
    if (client !== webSocket && client.readyState === webSocketOpetState) {
      client.send(JSON.stringify(serverMessage));
    }
  });
};

serverMessageMethods.userRoomAccept = (webSocket, room) => {
  const serverAcceptUserRoomMessage = {
    method: "userRoomAccept",
    content: room,
  };
  webSocket.send(JSON.stringify(serverAcceptUserRoomMessage));
};

export default serverMessageMethods;