import logMessage from "./js/logger";
import "./css/style.css";
import clientMessageMethods from "./server/messages/clientMessageMethods";

import { configurateButton, hideElement, unhideElement } from "./js/createEl";

// Log message to console
logMessage("Welcome to Expack!");

// Needed for Hot Module Replacement
if (typeof (module.hot) !== "undefined") {
  module.hot.accept(); // eslint-disable-line no-undef
}

const sendBtn = document.getElementById("send");
const chatRoomsBtn = document.getElementById("chatRoomsBtn");
const getOutRoomBtn = document.getElementById("getOutRoomBtn");

const messages = document.getElementById("messages");
const messageBox = document.getElementById("messageBox");

const createRoomInput = document.getElementById("createRoomInput");
const createRoomBtn = document.getElementById("createRoomBtn");

let chatRooms = document.getElementById("chatRooms");
const chatRoomsId = [];

let roomID;
let ownRoomID;

function changeHttpUrlOnWs(url) {
  return url.replace(/^http([s])?/, `ws$1`);
}

const HOST = changeHttpUrlOnWs(window.location.href);
console.log(HOST);
const ws = new WebSocket(HOST);

function acceptMessege(newMessage) {
  messages.textContent += `\n\n${newMessage}`;
  messages.scrollTop = messages.scrollHeight;
}

function configurateChatRoomButtons(rooms) {
  unhideElement(chatRooms);
  unhideElement(createRoomInput);
  unhideElement(createRoomBtn);

  logMessage(chatRooms);
  rooms.forEach(room => {
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

ws.onopen = function () {
  logMessage("websocket start");
};

ws.onmessage = (event) => {
  if (event.data === "p") {
    ws.send("");
  } else {
    const jsonData = JSON.parse(event.data);
    console.log("JSON DATA");
    console.log(jsonData);
    switch (jsonData.method) {
      case "message": {
        console.log("get info from server");
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
        console.log("roomID", roomID);
        enterChat();
        break;
      }
      case "getOutRoomAccept": {
        roomID = undefined;
        outChat();
        break;
      }
      case "createRoomAccept": {
        hideElement(chatRooms);
        const name = jsonData.content.split("__id")[0];
        const id = jsonData.content.split("__id")[1];
        roomID = id;
        enterChat();
        break;
      }
    }
  }
};

sendBtn.onclick = function () {
  if (!ws) {
    logMessage("No WebSocket connection :(");
    return;
  }

  if (roomID) {
    clientMessageMethods.sendMessage(ws, messageBox.value, roomID);
    acceptMessege(messageBox.value);
    messageBox.value = "";
  } else {
    console.error("no room");
  }
}

chatRoomsBtn.onclick = () => {
  console.log("chat rooms btn");
  clientMessageMethods.getRooms(ws);
};

getOutRoomBtn.onclick = () => {
  clientMessageMethods.getOutRoom(ws, roomID);
};

createRoomBtn.onclick = () => {
  logMessage(createRoomInput.value);
  clientMessageMethods.createRoom(ws, createRoomInput.value);
};