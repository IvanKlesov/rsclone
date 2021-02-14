import logMessage from "./js/logger";
import "./js/front/popup";
import "./css/main.css";
import { clientMessageMethods } from "./server/messages/clientMessageMethods";
import handleCliCommand, { handlerServerMachiCoroResponse } from "./js/machiCoroGame/front/machiCoroClientLogic";

import createEl, { configurateButton, hideElement, unhideElement } from "./js/createEl";

import initAuth from "./js/front/auth";
import clientPlayer from "./js/front/clientPlayer";

// Log message to console
logMessage("Welcome to Expack!");

// Needed for Hot Module Replacement
if (typeof module.hot !== "undefined") {
  module.hot.accept(); // eslint-disable-line no-undef
}

const newGame = document.querySelector(".new-game");
const gameContent = document.querySelector(".game-content");
const sendBtn = document.getElementById("send");
const chatRoomsBtn = document.getElementById("chatRoomsBtn");
const chatNewRooms = document.querySelector(".chat-new-rooms");

const getOutRoomBtn = document.getElementById("getOutRoomBtn");
const navBtn = document.querySelector(".nav-btn");

const messages = document.getElementById("messages");
const messageBox = document.getElementById("messageBox");

const createRoomInput = document.getElementById("createRoomInput");
const createRoomBtn = document.getElementById("createRoomBtn");

const chatRooms = document.getElementById("chatRooms");
const chatRoomsId = [];

const registrationData = {};
let roomID;
let infoAboutUsersInRoom = [];
clientPlayer.setInfoAboutUsersInRoomArray(infoAboutUsersInRoom);
const roomUserImages = [];
clientPlayer.setRoomUserImages(roomUserImages);

function getUserNameUsingUUID(UUID) {
  if (registrationData.id === UUID) {
    return registrationData.name;
  }
  return infoAboutUsersInRoom.find((user) => user.id === UUID).name;
}

function getUserPhotoUsingUUID(UUID) {
  return roomUserImages[UUID];
}

function changeHttpUrlOnWs(url) {
  const wsURL = url.replace(/^http([s])?/, "ws$1").split("/");
  wsURL[wsURL.length - 1] = "";
  return wsURL.join("");
}

const HOST = changeHttpUrlOnWs(window.location.href);
logMessage(HOST);
const ws = new WebSocket(HOST);
clientPlayer.setWs(ws);

initAuth();

function acceptMessege(newMessage, sender) {
  const div = createEl("div", "flex flex-wrap align-items-center", "", messages);
  const img = getUserPhotoUsingUUID(sender).cloneNode();
  img.width = 20;
  img.height = 20;

  div.appendChild(img);
  const p = createEl("p", "", "", div);
  p.innerHTML = `   ${getUserNameUsingUUID(sender)}[${sender}]: ${newMessage}`;

  messages.scrollTop = messages.scrollHeight;
}

function acceptErrorMessage(newMessage) {
  const p = createEl("p", "red", "");
  p.textContent += newMessage;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

function configurateChatRoomButtons(rooms) {
  unhideElement(chatRooms);
  unhideElement(createRoomInput);
  unhideElement(createRoomBtn);

  logMessage(chatRooms);
  rooms.forEach((room) => {
    const name = room.split("__id")[0];
    const id = room.split("__id")[1];
    if (chatRoomsId.indexOf(id) === -1) {
      chatRoomsId.push(id);
      logMessage(room);
      const button = configurateButton(name, "", id, chatNewRooms);
      button.addEventListener("click", () => {
        clientMessageMethods.setRoom(ws, id);
        hideElement(chatRooms);
        gameContent.classList.remove("hidden");
      });
    }
  });
}

// rewrite to toogle
function enterChat() {
  unhideElement(messages);
  unhideElement(messageBox);
  unhideElement(sendBtn);
  unhideElement(getOutRoomBtn);
  hideElement(chatRoomsBtn);
  hideElement(createRoomInput);
  hideElement(createRoomBtn);
}

function outChat() {
  hideElement(messages);
  hideElement(messageBox);
  hideElement(sendBtn);
  hideElement(getOutRoomBtn);
  unhideElement(chatRoomsBtn);
  unhideElement(createRoomInput);
  unhideElement(createRoomBtn);
}

function isGameCliCommand(clientMessage) {
  logMessage("isGameCliCommand method");
  if (clientMessage[0] === "/") {
    logMessage(true);
    return true;
  }
  return false;
}

ws.onopen = () => {
  logMessage("websocket start");
};

ws.onmessage = (event) => {
  if (event.data === "p") {
    ws.send("");
  } else {
    const jsonData = JSON.parse(event.data);
    logMessage("JSON DATA");
    logMessage(jsonData);
    switch (jsonData.method) {
      case "registrationAccept": {
        registrationData.id = jsonData.id;
        registrationData.name = jsonData.name;
        registrationData.photoAddress = jsonData.photoAddress;
        clientPlayer.setRegistrationData(registrationData);

        const img = new Image();
        img.src = registrationData.photoAddress;
        roomUserImages[registrationData.id] = img;

        break;
      }
      case "message": {
        logMessage("get info from server");
        acceptMessege(jsonData.content, jsonData.sender);
        break;
      }
      case "rooms": {
        const rooms = jsonData.content;
        configurateChatRoomButtons(rooms);
        break;
      }
      case "userRoomAccept": {
        roomID = jsonData.content;
        clientPlayer.setRoomID(roomID);
        infoAboutUsersInRoom = jsonData.infoAboutOtherUsers;
        clientPlayer.setInfoAboutUsersInRoomArray(infoAboutUsersInRoom);
        jsonData.infoAboutOtherUsers.forEach((user) => {
          const img = new Image();
          img.src = user.photoAddress;
          roomUserImages[user.id] = img;
        });
        enterChat();
        break;
      }

      case "newUserInRoom": {
        if (jsonData.roomID === roomID) {
          const newUser = {
            id: jsonData.id,
            name: jsonData.name,
            photoAddress: jsonData.photoAddress,
          };
          const img = new Image();
          img.src = newUser.photoAddress;
          roomUserImages[newUser.id] = img;
          infoAboutUsersInRoom.push(newUser);
        }
        break;
      }
      case "userRoomReject": {
        logMessage("acces to room denied");
        break;
      }
      case "getOutRoomAccept": {
        roomID = undefined;
        clientPlayer.setRoomID(roomID);
        navBtn.classList.remove("hidden");
        outChat();
        break;
      }
      case "createRoomAccept": {
        hideElement(chatRooms);
        // const name = jsonData.content.split("__id")[0];
        const id = jsonData.content.split("__id")[1];
        roomID = id;
        clientPlayer.setRoomID(roomID);
        enterChat();
        hideElement(chatRooms);
        gameContent.classList.remove("hidden");
        break;
      }
      default: {
        const response = handlerServerMachiCoroResponse(jsonData);
        acceptErrorMessage(response);
        break;
      }
    }
  }
};

sendBtn.onclick = () => {
  if (!ws) {
    logMessage("No WebSocket connection :(");
    return;
  }

  if (isGameCliCommand(messageBox.value)) {
    handleCliCommand(ws, messageBox.value, roomID);
    acceptMessege(messageBox.value, registrationData.id);
    messageBox.value = "";
    return;
  }

  if (roomID) {
    clientMessageMethods.sendMessage(ws, messageBox.value, roomID);
    acceptMessege(messageBox.value, registrationData.id);
    messageBox.value = "";
  } else {
    logMessage("no room");
  }
};

chatRoomsBtn.onclick = () => {
  logMessage("chat rooms btn");
  clientMessageMethods.getRooms(ws);
  navBtn.classList.add("hidden");
};

newGame.onclick = () => {
  logMessage("chat rooms btn");
  clientMessageMethods.getRooms(ws);
  hideElement(chatRoomsBtn);
};

getOutRoomBtn.onclick = () => {
  clientMessageMethods.getOutRoom(ws, roomID);
};

createRoomBtn.onclick = () => {
  logMessage(createRoomInput.value);
  clientMessageMethods.createRoom(ws, createRoomInput.value);
};
