import clientPlayer from "./clientPlayer";
import {
  sendStartMessage,
  sendHoldMessage,
  sendThrowCubeMessage,
  sendSwapCardsMessage,
  sendStealMessage,
  sendAcceptPortBonusMessage,
} from "../machiCoroGame/front/machiCoroClientMessages";

import allCards from "./allCards";
import avatar from "../../assets/images/avatar.png";

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
});

export function hideStartGameButton() {
  startGame.classList.add("hidden");
}

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
  /* cityHall, */
  "wheatField",
  "bakery",
  /*   shirtPort,
    shirtRailwayStation,
    shirtShoppingCenter,
    shirtAmusementPark,
    shirtRadioTower,
    shirtAirport, */
];

const opponentsUUID = [];

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

const wrapperBoard = document.querySelector(".game-board-wrapper");
const board = document.querySelector(".game-board");
const ctx = board.getContext("2d");
const handTopPlayer = [];
const handLeftPlayer = [];
const handRightPlayer = [];
const handBottomPlayer = [];
const padding = 20;

export default function createBoard() {
  console.log("33333333333333333333333333333333333333");
  console.log(clientPlayer.getInfoAboutUsersInRoomArray());
  opponentsUUID[0] = clientPlayer.getInfoAboutUsersInRoomArray()[0].id;
  if (clientPlayer.getInfoAboutUsersInRoomArray()[1]) {
    opponentsUUID[1] = clientPlayer.getInfoAboutUsersInRoomArray()[1].id;
  }

  if (clientPlayer.getInfoAboutUsersInRoomArray()[2]) {
    opponentsUUID[2] = clientPlayer.getInfoAboutUsersInRoomArray()[2].id;
  }

  const widthBoard = wrapperBoard.offsetWidth;
  const heightBoard = wrapperBoard.offsetHeight;
  const widthInfoPlayer = 100;
  const heightInfoPlayer = 140;

  board.setAttribute("width", widthBoard);
  board.setAttribute("height", heightBoard);

  ctx.clearRect(0, 0, board.width, board.height);

  // Игрок сверху
  const xTopPlayer = Math.ceil(widthBoard * 0.35);
  const firstOpponent = clientPlayer.getInfoAboutUsersInRoomArray().find((opponent) => opponent.id === opponentsUUID[0]);
  ctx.strokeRect(xTopPlayer, 0, widthInfoPlayer, heightInfoPlayer);
  const imgTopPlayer = new Image();
  imgTopPlayer.src = firstOpponent.photoAddress || avatar;
  imgTopPlayer.onload = function loadAvatarTop() {
    ctx.drawImage(imgTopPlayer, xTopPlayer, 0, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "18px serif";
  ctx.fillText("Player 1", xTopPlayer + 10, heightInfoPlayer - 25);
  ctx.fillText("Coin:", xTopPlayer + 10, heightInfoPlayer - 5);

  ctx.strokeRect(xTopPlayer + widthInfoPlayer + padding, 0, 400, 140);

  const firstUserCards = firstOpponent.cards || basicHand;
  for (let i = 0, k = 1; i < firstUserCards.length; i += 1, k += 1) {
    const img = new Image();
    img.src = allCards[firstUserCards[i]];
    img.onload = function loadCardsTop() {
      ctx.drawImage(img, xTopPlayer + widthInfoPlayer + padding * k, 0, 100, 140);
    };
    handTopPlayer.push({
      name: allCards[firstUserCards[i]],
      left: xTopPlayer + widthInfoPlayer + padding * k,
      top: 0,
      width: 100,
      height: 140,
    });
  }

  console.log("111111111111111111111111111111111111111111111");
  console.log(clientPlayer.getInfoAboutUsersInRoomArray());

  if (clientPlayer.getInfoAboutUsersInRoomArray().length >= 2) {
    // игрок слева
    const xLeftPlayer = Math.ceil(widthBoard * 0.1);
    const yLeftPlayer = Math.ceil(heightBoard * 0.25);
    const secondOpponent = clientPlayer.getInfoAboutUsersInRoomArray().find((opponent) => opponent.id === opponentsUUID[1]);
    ctx.strokeRect(xLeftPlayer, yLeftPlayer, widthInfoPlayer, heightInfoPlayer);
    const imgLeftPlayer = new Image();
    imgLeftPlayer.src = secondOpponent.photoAddress || avatar;
    imgLeftPlayer.onload = function loadAvatarLeft() {
      ctx.drawImage(imgLeftPlayer, xLeftPlayer, yLeftPlayer, widthInfoPlayer, heightInfoPlayer - 40);
    };
    ctx.font = "18px serif";
    ctx.fillText("Player 2", xLeftPlayer + 10, yLeftPlayer + heightInfoPlayer - 25);
    ctx.fillText("Coin:", xLeftPlayer + 10, yLeftPlayer + heightInfoPlayer - 5);

    ctx.strokeRect(xLeftPlayer, yLeftPlayer + heightInfoPlayer + padding, 400, 140);

    const secondUserCards = secondOpponent.cards ? secondOpponent.cards : basicHand;
    for (let i = 0, k = 0; i < secondUserCards.length; i += 1, k += 1) {
      const img = new Image();
      img.src = allCards[secondUserCards[i]];
      img.onload = function loadCardsLeft() {
        ctx.drawImage(img, xLeftPlayer + padding * k, yLeftPlayer + heightInfoPlayer + padding, 100, 140);
      };
      handLeftPlayer.push({
        name: allCards[secondUserCards[i]],
        left: xLeftPlayer + padding * k,
        top: yLeftPlayer + heightInfoPlayer + padding,
        width: 100,
        height: 140,
      });
    }
  }

  if (clientPlayer.getInfoAboutUsersInRoomArray().length >= 3) {
    // игрок справа
    const xRightPlayer = Math.ceil(widthBoard * 0.8);
    const yRightPlayer = Math.ceil(heightBoard * 0.25);
    const thirdOpponent = clientPlayer.getInfoAboutUsersInRoomArray().find((opponent) => opponent.id === opponentsUUID[2]);

    ctx.strokeRect(xRightPlayer, yRightPlayer, widthInfoPlayer, heightInfoPlayer);
    const imgRightPlayer = new Image();
    imgRightPlayer.src = thirdOpponent.photoAddress || avatar;
    imgRightPlayer.onload = function loadAvatarRight() {
      ctx.drawImage(imgRightPlayer, xRightPlayer, yRightPlayer, widthInfoPlayer, heightInfoPlayer - 40);
    };
    ctx.font = "18px serif";
    ctx.fillText("Player 3", xRightPlayer + 10, yRightPlayer + heightInfoPlayer - 25);
    ctx.fillText("Coin:", xRightPlayer + 10, yRightPlayer + heightInfoPlayer - 5);

    ctx.strokeRect(xRightPlayer - 300, yRightPlayer + heightInfoPlayer + padding, 400, 140);


    const thirdUserCards = thirdOpponent.cards ? thirdOpponent.cards : basicHand;
    for (let i = 0, k = 0; i < thirdUserCards.length; i += 1, k += 1) {
      const img = new Image();
      img.src = allCards[thirdUserCards[i]];
      img.onload = function loadCardsRight() {
        ctx.drawImage(img, xRightPlayer - 300 + padding * k, yRightPlayer + heightInfoPlayer + padding, 100, 140);
      };
      handRightPlayer.push({
        name: allCards[thirdUserCards[i]],
        left: xRightPlayer - 300 + padding * k,
        top: yRightPlayer + heightInfoPlayer + padding,
        width: 100,
        height: 140,
      });
    }
  }

  // нижний игрок
  const xBottomPlayer = Math.ceil(widthBoard * 0.1);
  const yBottomPlayer = Math.ceil(heightBoard * 0.8);
  ctx.strokeRect(xBottomPlayer, yBottomPlayer, widthInfoPlayer, heightInfoPlayer + padding);
  const imgBottomPlayer = new Image();
  imgBottomPlayer.src = clientPlayer.getRegistrationData().photoAddress || avatar;
  imgBottomPlayer.onload = function loadAvatarBottom() {
    ctx.drawImage(imgBottomPlayer, xBottomPlayer, yBottomPlayer, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "18px serif";
  ctx.fillText("Player 4", xBottomPlayer + 10, yBottomPlayer + heightInfoPlayer - 20);
  ctx.fillText("Coin:", xBottomPlayer + 10, yBottomPlayer + heightInfoPlayer);

  ctx.strokeRect(xBottomPlayer + widthInfoPlayer + padding, yBottomPlayer, 1200, heightInfoPlayer + padding);

  const yourHand = clientPlayer.getRegistrationData().cards;
  for (let i = 0, k = 0; i < yourHand.length; i += 1, k += 1) {
    const img = new Image();
    img.src = allCards[yourHand[i]];
    let y;
    img.onload = function loadCardsBottom() {
      if (xBottomPlayer + widthInfoPlayer + padding + (widthInfoPlayer / 2 + padding) * k <= 1200) {
        y = yBottomPlayer;
      } else {
        k = 0;
        y = yBottomPlayer + heightInfoPlayer / 2 + padding;
      }
      ctx.drawImage(img, xBottomPlayer + widthInfoPlayer + padding + (widthInfoPlayer / 2 + padding) * k, y, 50, 70);
      handBottomPlayer.push({
        name: allCards[yourHand[i]],
        left: xBottomPlayer + widthInfoPlayer + padding + (widthInfoPlayer / 2 + padding) * k,
        top: y,
        width: 50,
        height: 70,
      });
    };
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

export function drawNewCard(newCardName) {
  const widthBoard = wrapperBoard.offsetWidth;

  const widthCard = 50;
  const heightCard = 70;

  const xBottomPlayer = Math.ceil(widthBoard * 0.1);

  let x = handBottomPlayer[handBottomPlayer.length - 1].left;
  let y = handBottomPlayer[handBottomPlayer.length - 1].top;
  const newImg = new Image();

  newImg.src = allCards[newCardName];

  switch (newCardName) {
    case "telecentre":
      stealMoney.classList.remove("hidden");
      break;
    case "port":
      portBonus.classList.remove("hidden");
      break;
    case "railwayStation":
      throwCubes2.classList.remove("hidden");
      break;
    case "businessCenter":
      swapCards.classList.remove("hidden");
      break;
    default:
  }

  newImg.onload = function addCardsBottom() {
    if (x + padding + widthCard <= xBottomPlayer + 1200) {
      handBottomPlayer.push({
        name: newImg.src,
        left: x + widthCard + padding,
        top: y,
        width: 50,
        height: 70,
      });

      ctx.drawImage(newImg, x + widthCard + padding, y, widthCard, heightCard);
    } else {
      x = xBottomPlayer + widthCard * 2 + padding;
      y = y + padding + heightCard;
      handBottomPlayer.push({
        name: newImg.src,
        left: x,
        top: y,
        width: 50,
        height: 70,
      });

      ctx.drawImage(newImg, x, y, widthCard, heightCard);
    }
  };

  /* board.addEventListener("click", (event) => {
    const box = board.getBoundingClientRect();

    const newX = event.clientX - box.left;
    const newY = event.clientY - box.top;

    if (
      newY > handBottomPlayer[handBottomPlayer.length - 1].top
      && newY < handBottomPlayer[handBottomPlayer.length - 1].top + handBottomPlayer[handBottomPlayer.length - 1].height
      && newX > handBottomPlayer[handBottomPlayer.length - 1].left
      && newX < handBottomPlayer[handBottomPlayer.length - 1].left + handBottomPlayer[handBottomPlayer.length - 1].width
    ) {
      showFullCard(handBottomPlayer[handBottomPlayer.length - 1].name);
      fullCardWrapper.classList.remove("hidden");
    }
  }); */
}
