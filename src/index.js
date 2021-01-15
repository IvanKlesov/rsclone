import logMessage from "./js/logger";
import "./css/style.css";
// Log message to console
logMessage("Welcome to Expack!");

// Needed for Hot Module Replacement
if (typeof (module.hot) !== "undefined") {
  module.hot.accept(); // eslint-disable-line no-undef
}

const sendBtn = document.querySelector("#send");
const messages = document.querySelector("#messages");
const messageBox = document.querySelector("#messageBox");

function changeHttpUrlOnWs(url) {
  return url.replace(/^http([s])?/, `ws$1`);
}

function acceptMessege(newMessage) {
  messages.textContent += `\n\n${newMessage}`;
  messages.scrollTop = messages.scrollHeight;
}

const HOST = changeHttpUrlOnWs(window.location.href);
console.log(HOST);
const ws = new WebSocket(HOST);

ws.onopen = function () {
  logMessage("websocket start");
};

ws.onmessage = (event) => {
  if (event.data === "p") {
    ws.send("");
  } else {
    console.log("get info from server");
    acceptMessege(event.data);
  }
};

sendBtn.onclick = function () {
  if (!ws) {
    logMessage("No WebSocket connection :(");
    return;
  }

  ws.send(messageBox.value);
  acceptMessege(messageBox.value);
  messageBox.value = '';
}
