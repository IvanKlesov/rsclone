export const serverMessageMethods = {};

serverMessageMethods.sendRooms = (webSocket, roomsArray) => {
  const responseRooms = {
    method: "rooms",
    content: roomsArray.map((room) => room.name.concat(`__id${room.id}`)),
  };
  const response = JSON.stringify(responseRooms);
  webSocket.send(response);
};

serverMessageMethods.sendMessage = (curRoom, webSocket, jsonFromClient, webSocketOpetState) => {
  const serverMessage = {
    method: "message",
    content: jsonFromClient.content,
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

serverMessageMethods.userRoomAccept = (webSocket, roomID, curRoom) => {
  const roomUsers = curRoom.getUsers().filter((user) => user.getWs() !== webSocket);
  const infoAboutOtherUsers = roomUsers.map((user) => {
    const userInfo = {
      id: user.getUserID(),
      name: user.getUserName(),
      photoAddress: user.getUserPhotoAdress(),
    };
    return userInfo;
  });
  const serverAcceptUserRoomMessage = {
    method: "userRoomAccept",
    content: roomID,
    infoAboutOtherUsers,
  };
  webSocket.send(JSON.stringify(serverAcceptUserRoomMessage));
};

serverMessageMethods.newUserInRoom = (room, newUser) => {
  const roomUsers = room.getUsers().filter((user) => user !== newUser);
  const newUserInfo = {
    method: "newUserInRoom",
    roomID: room.getRoomID(),
    id: newUser.getUserID(),
    name: newUser.getUserName(),
    photoAddress: newUser.getUserPhotoAdress(),
  };

  roomUsers.forEach((user) => {
    user.getWs().send(JSON.stringify(newUserInfo));
  });
}

serverMessageMethods.userRoomReject = (webSocket, roomID) => {
  const serverRejectUserRoomMessage = {
    method: "userRoomReject",
    content: roomID,
  };
  webSocket.send(JSON.stringify(serverRejectUserRoomMessage));
};

serverMessageMethods.getOutRoomAccept = (webSocket) => {
  const serverGetOutRoomAccept = {
    method: "getOutRoomAccept",
  };
  webSocket.send(JSON.stringify(serverGetOutRoomAccept));
};

serverMessageMethods.createRoomAccept = (webSocket, newRoom) => {
  const serverCreateRoomAccept = {
    method: "createRoomAccept",
    content: newRoom.name.concat(`__id${newRoom.id}`),
  };
  webSocket.send(JSON.stringify(serverCreateRoomAccept));
};

export default serverMessageMethods;
