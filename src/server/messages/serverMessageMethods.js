export const serverMessageMethods = {};

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
    if (client !== webSocket) {
      if (client.readyState === webSocketOpetState) {
        client.send(JSON.stringify(serverMessage));
      } else {
        curRoom.removeUser(client);
      }
    }
  });
};

serverMessageMethods.userRoomAccept = (webSocket, roomID) => {
  const serverAcceptUserRoomMessage = {
    method: "userRoomAccept",
    content: roomID,
  };
  webSocket.send(JSON.stringify(serverAcceptUserRoomMessage));
};

serverMessageMethods.getOutRoomAccept = (webSocket) => {
  const serverGetOutRoomAccept = {
    method: "getOutRoomAccept",
  };
  webSocket.send(JSON.stringify(serverGetOutRoomAccept));
}

serverMessageMethods.createRoomAccept = (webSocket, newRoom) => {
  const serverCreateRoomAccept = {
    method: "createRoomAccept",
    content: newRoom.name.concat(`__id${newRoom.id}`),
  };
  webSocket.send(JSON.stringify(serverCreateRoomAccept));
}

export default serverMessageMethods;
