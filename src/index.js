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

const sendBtn = document.querySelector("#send");
const chatRoomsBtn = document.querySelector("#chatRoomsBtn");
const messages = document.querySelector("#messages");
const messageBox = document.querySelector("#messageBox");
const chatRooms = document.getElementById("chatRooms");

let roomID;

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
  logMessage(chatRooms);
  rooms.forEach(room => {
    const name = room.split("__id")[0];
    const id = room.split("__id")[1];
    logMessage(room);
    const button = configurateButton(name, "", id, chatRooms);
    button.addEventListener("click", () => {
      clientMessageMethods.setRoom(ws, id);
      hideElement(chatRooms);
    });
  });
}

function enterChat() {
  unhideElement(messages);
  unhideElement(messageBox);
  unhideElement(sendBtn);
  hideElement(chatRoomsBtn);
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
    messageBox.value = '';
  } else {
    console.error("no room");
  }
}

chatRoomsBtn.onclick = () => {
  console.log("chat rooms btn");
  clientMessageMethods.getRooms(ws);
}
