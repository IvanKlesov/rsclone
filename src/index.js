import logMessage from "./js/logger";
import "./js/popup";
import "./css/main.css";
import { clientMessageMethods } from "./server/messages/clientMessageMethods";
import handleCliCommand, { handlerServerMachiCoroResponse } from "./js/machiCoroGame/front/machiCoroClientLogic";

import createEl, { configurateButton, hideElement, unhideElement } from "./js/createEl";

// Log message to console
logMessage("Welcome to Expack!");

// Needed for Hot Module Replacement
if (typeof module.hot !== "undefined") {
  module.hot.accept(); // eslint-disable-line no-undef
}

const newGame = document.querySelector(".new-game");
const sendBtn = document.getElementById("send");
const chatRoomsBtn = document.getElementById("chatRoomsBtn");
const getOutRoomBtn = document.getElementById("getOutRoomBtn");

const messages = document.getElementById("messages");
const messageBox = document.getElementById("messageBox");

const createRoomInput = document.getElementById("createRoomInput");
const createRoomBtn = document.getElementById("createRoomBtn");

const chatRooms = document.getElementById("chatRooms");
const chatRoomsId = [];

let roomID;
// let ownRoomID;

function changeHttpUrlOnWs(url) {
  return url.replace(/^http([s])?/, "ws$1");
}

const HOST = changeHttpUrlOnWs(window.location.href);
logMessage(HOST);
const ws = new WebSocket(HOST);

function acceptMessege(newMessage) {
  const p = createEl("p");
  p.textContent += newMessage;
  messages.appendChild(p);
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
      const button = configurateButton(name, "", id, chatRooms);
      button.addEventListener("click", () => {
        clientMessageMethods.setRoom(ws, id);
        hideElement(chatRooms);
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
      case "message": {
        logMessage("get info from server");
        acceptMessege(jsonData.content);
        break;
      }
      case "rooms": {
        const rooms = jsonData.content;
        configurateChatRoomButtons(rooms);
        break;
      }
      case "userRoomAccept": {
        roomID = jsonData.content;
        logMessage("roomID", roomID);
        enterChat();
        break;
      }
      case "userRoomReject": {
        logMessage("acces to room denied");
        break;
      }
      case "getOutRoomAccept": {
        roomID = undefined;
        outChat();
        break;
      }
      case "createRoomAccept": {
        hideElement(chatRooms);
        // const name = jsonData.content.split("__id")[0];
        const id = jsonData.content.split("__id")[1];
        roomID = id;
        enterChat();
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
    acceptMessege(messageBox.value);
    messageBox.value = "";
    return;
  }

  if (roomID) {
    clientMessageMethods.sendMessage(ws, messageBox.value, roomID);
    acceptMessege(messageBox.value);
    messageBox.value = "";
  } else {
    logMessage("no room");
  }
};

chatRoomsBtn.onclick = () => {
  logMessage("chat rooms btn");
  clientMessageMethods.getRooms(ws);
};

newGame.onclick = () => {
  logMessage("chat rooms btn");
  clientMessageMethods.getRooms(ws);
};

getOutRoomBtn.onclick = () => {
  clientMessageMethods.getOutRoom(ws, roomID);
};

createRoomBtn.onclick = () => {
  logMessage(createRoomInput.value);
  clientMessageMethods.createRoom(ws, createRoomInput.value);
};
