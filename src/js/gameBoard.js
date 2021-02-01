import avatar from "../assets/images/avatar.png";
import bakery from "../assets/images/startСards/bakery.png";
import cityHall from "../assets/images/startСards/cityHall.png";
import wheatField from "../assets/images/startСards/wheatField.png";
import shirtAmusementPark from "../assets/images/attractions/shirtAmusementPark.png";
import shirtAirport from "../assets/images/attractions/shirtAirport.png";
import shirtPort from "../assets/images/attractions/shirtPort.png";
import shirtRadioTower from "../assets/images/attractions/shirtRadioTower.png";
import shirtRailwayStation from "../assets/images/attractions/shirtRailwayStation.png";
import shirtShoppingCenter from "../assets/images/attractions/shirtShoppingCenter.png";

import clientPlayer from "./front/clientPlayer";
import {
  sendStartMessage,
  sendHoldMessage,
  sendThrowCubeMessage,
  sendSwapCardsMessage,
  sendStealMessage,
  sendAcceptPortBonusMessage,
} from "./machiCoroGame/front/machiCoroClientLogic";

const fullCardWrapper = document.querySelector(".full-card-wrapper");
const fullCard = document.querySelector(".full-card");
const startGame = document.querySelector(".btn-start");
const holdTurn = document.querySelector(".btn-hold");
const throwCubes = document.querySelector(".btn-throw");
const throwCubes2 = document.querySelector(".btn-throw2");
const swapCards = document.querySelector(".btn-swap");
const stealMoney = document.querySelector(".btn-steal");
const portBonus = document.querySelector(".btn-port-bonus");

startGame.addEventListener("click", () => {
  const ws = clientPlayer.getWs();
  const roomID = clientPlayer.getRoomID();
  sendStartMessage(ws, roomID);
  startGame.classList.add("hidden");
});

holdTurn.addEventListener("click", () => {
  const ws = clientPlayer.getWs();
  const roomID = clientPlayer.getRoomID();
  sendHoldMessage(ws, roomID);
});

throwCubes.addEventListener("click", () => {
  const ws = clientPlayer.getWs();
  const roomID = clientPlayer.getRoomID();
  sendThrowCubeMessage(ws, roomID, 1);
});

throwCubes2.addEventListener("click", () => {
  const ws = clientPlayer.getWs();
  const roomID = clientPlayer.getRoomID();
  sendThrowCubeMessage(ws, roomID, 2);
});

swapCards.addEventListener("click", () => {
  const ws = clientPlayer.getWs();
  const roomID = clientPlayer.getRoomID();
  sendSwapCardsMessage(ws, roomID);
});

stealMoney.addEventListener("click", () => {
  const ws = clientPlayer.getWs();
  const roomID = clientPlayer.getRoomID();
  sendStealMessage(ws, roomID, "stealAccept");
});

portBonus.addEventListener("click", () => {
  const ws = clientPlayer.getWs();
  const roomID = clientPlayer.getRoomID();
  sendAcceptPortBonusMessage(ws, roomID);
});

const basicHand = [
  cityHall,
  wheatField,
  bakery,
  shirtPort,
  shirtRailwayStation,
  shirtShoppingCenter,
  shirtAmusementPark,
  shirtRadioTower,
  shirtAirport,
];

function showFullCard(url) {
  if (fullCard.children.length > 0) {
    fullCard.removeChild(fullCard.firstChild);
  }
  const image = document.createElement("img");
  image.src = url;
  image.width = 250;
  image.height = 350;
  fullCard.prepend(image);
}

export default function createBoard() {
  const wrapperBoard = document.querySelector(".game-board-wrapper");
  const board = document.querySelector(".game-board");
  const ctx = board.getContext("2d");
  const widthBoard = wrapperBoard.offsetWidth;
  const heightBoard = wrapperBoard.offsetHeight;
  const widthInfoPlayer = 100;
  const heightInfoPlayer = 140;
  const padding = 20;

  board.setAttribute("width", widthBoard);
  board.setAttribute("height", heightBoard);

  ctx.clearRect(0, 0, board.width, board.height);

  // Игрок сверху
  const xTopPlayer = Math.ceil(widthBoard * 0.35);
  ctx.strokeRect(xTopPlayer, 0, widthInfoPlayer, heightInfoPlayer);
  const imgTopPlayer = new Image();
  imgTopPlayer.src = avatar;
  imgTopPlayer.onload = function loadAvatarTop() {
    ctx.drawImage(imgTopPlayer, xTopPlayer, 0, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "18px serif";
  ctx.fillText("Player 1", xTopPlayer + 10, heightInfoPlayer - 25);
  ctx.fillText("Coin:", xTopPlayer + 10, heightInfoPlayer - 5);

  ctx.strokeRect(xTopPlayer + widthInfoPlayer + padding, 0, 400, 140);
  const handTopPlayer = [];
  for (let i = 0, k = 1; i < basicHand.length; i += 1, k += 1) {
    const img = new Image();
    img.src = basicHand[i];
    img.onload = function loadCardsTop() {
      ctx.drawImage(img, xTopPlayer + widthInfoPlayer + padding * k, 0, 100, 140);
    };
    handTopPlayer.push({
      name: basicHand[i],
      left: xTopPlayer + widthInfoPlayer + padding * k,
      top: 0,
      width: 100,
      height: 140,
    });
  }

  // игрок слева
  const xLeftPlayer = Math.ceil(widthBoard * 0.1);
  const yLeftPlayer = Math.ceil(heightBoard * 0.25);
  ctx.strokeRect(xLeftPlayer, yLeftPlayer, widthInfoPlayer, heightInfoPlayer);
  const imgLeftPlayer = new Image();
  imgLeftPlayer.src = avatar;
  imgLeftPlayer.onload = function loadAvatarLeft() {
    ctx.drawImage(imgLeftPlayer, xLeftPlayer, yLeftPlayer, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "18px serif";
  ctx.fillText("Player 2", xLeftPlayer + 10, yLeftPlayer + heightInfoPlayer - 25);
  ctx.fillText("Coin:", xLeftPlayer + 10, yLeftPlayer + heightInfoPlayer - 5);

  ctx.strokeRect(xLeftPlayer, yLeftPlayer + heightInfoPlayer + padding, 400, 140);
  const handLeftPlayer = [];
  for (let i = 0, k = 0; i < basicHand.length; i += 1, k += 1) {
    const img = new Image();
    img.src = basicHand[i];
    img.onload = function loadCardsLeft() {
      ctx.drawImage(img, xLeftPlayer + padding * k, yLeftPlayer + heightInfoPlayer + padding, 100, 140);
    };
    handLeftPlayer.push({
      name: basicHand[i],
      left: xLeftPlayer + padding * k,
      top: yLeftPlayer + heightInfoPlayer + padding,
      width: 100,
      height: 140,
    });
  }

  // игрок справа
  const xRightPlayer = Math.ceil(widthBoard * 0.8);
  const yRightPlayer = Math.ceil(heightBoard * 0.25);
  ctx.strokeRect(xRightPlayer, yRightPlayer, widthInfoPlayer, heightInfoPlayer);
  const imgRightPlayer = new Image();
  imgRightPlayer.src = avatar;
  imgRightPlayer.onload = function loadAvatarRight() {
    ctx.drawImage(imgRightPlayer, xRightPlayer, yRightPlayer, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "18px serif";
  ctx.fillText("Player 3", xRightPlayer + 10, yRightPlayer + heightInfoPlayer - 25);
  ctx.fillText("Coin:", xRightPlayer + 10, yRightPlayer + heightInfoPlayer - 5);

  ctx.strokeRect(xRightPlayer - 300, yRightPlayer + heightInfoPlayer + padding, 400, 140);
  const handRightPlayer = [];
  for (let i = 0, k = 0; i < basicHand.length; i += 1, k += 1) {
    const img = new Image();
    img.src = basicHand[i];
    img.onload = function loadCardsRight() {
      ctx.drawImage(img, xRightPlayer - 300 + padding * k, yRightPlayer + heightInfoPlayer + padding, 100, 140);
    };
    handRightPlayer.push({
      name: basicHand[i],
      left: xRightPlayer - 300 + padding * k,
      top: yRightPlayer + heightInfoPlayer + padding,
      width: 100,
      height: 140,
    });
  }

  // нижний игрок
  const xBottomPlayer = Math.ceil(widthBoard * 0.1);
  const yBottomPlayer = Math.ceil(heightBoard * 0.8);
  ctx.strokeRect(xBottomPlayer, yBottomPlayer, widthInfoPlayer, heightInfoPlayer + padding);
  const imgBottomPlayer = new Image();
  imgBottomPlayer.src = avatar;
  imgBottomPlayer.onload = function loadAvatarBottom() {
    ctx.drawImage(imgBottomPlayer, xBottomPlayer, yBottomPlayer, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "18px serif";
  ctx.fillText("Player 4", xBottomPlayer + 10, yBottomPlayer + heightInfoPlayer - 20);
  ctx.fillText("Coin:", xBottomPlayer + 10, yBottomPlayer + heightInfoPlayer);

  ctx.strokeRect(xBottomPlayer + widthInfoPlayer + padding, yBottomPlayer, 1200, heightInfoPlayer + padding);
  const handBottomPlayer = [];
  for (let i = 0, k = 0; i < basicHand.length; i += 1, k += 1) {
    const img = new Image();
    img.src = basicHand[i];
    img.onload = function loadCardsBottom() {
      ctx.drawImage(
        img,
        xBottomPlayer + widthInfoPlayer + padding + (widthInfoPlayer / 2 + padding) * k,
        yBottomPlayer,
        50,
        70,
      );
    };
    handBottomPlayer.push({
      name: basicHand[i],
      left: xBottomPlayer + widthInfoPlayer + padding + (widthInfoPlayer / 2 + padding) * k,
      top: yBottomPlayer,
      width: 50,
      height: 70,
    });
  }

  board.addEventListener("click", (event) => {
    const box = board.getBoundingClientRect();

    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    handBottomPlayer.forEach((card) => {
      if (y > card.top && y < card.top + card.height && x > card.left && x < card.left + card.width) {
        showFullCard(card.name);
        fullCardWrapper.classList.remove("hidden");
      }
    });
  });
}
