import clientPlayer from "./clientPlayer";
import {
  sendStartMessage,
  sendHoldMessage,
  sendThrowCubeMessage,
  sendStealMessage,
  sendAcceptPortBonusMessage,
} from "../machiCoroGame/front/machiCoroClientMessages";
import { allCards } from "./allCards";
import avatar from "../../assets/images/avatar.png";
import {
  handTopPlayer,
  handLeftPlayer,
  handRightPlayer,
  handBottomPlayer,
  basicHand,
  padding,
  opponentsUUID,
  swapCardsWrapper,
  swapWrapper,
} from "./gameBoardConsts";

require("./gameBoardSwapCards");

const fullCardWrapper = document.querySelector(".full-card-wrapper");
const fullCard = document.querySelector(".full-card");
const stealWrapper = document.querySelector(".steal-wrapper");

const startGame = document.querySelector(".btn-start");
const holdTurn = document.querySelector(".btn-hold");
const throwCubes = document.querySelector(".btn-throw");
const throwCubes2 = document.querySelector(".btn-throw2");
const swapCards = document.querySelector(".btn-swap");
const stealMoney = document.querySelector(".btn-steal");
const portBonus = document.querySelector(".btn-port-bonus");
const stealPlayer1 = document.querySelector(".steal-player1");
const stealPlayer2 = document.querySelector(".steal-player2");
const stealPlayer3 = document.querySelector(".steal-player3");
const backStealPlayer = document.querySelector(".back-steal-player");
const backSwapPlayer = document.querySelector(".back-swap-player");
const backSwap = document.querySelector(".back-swap");

const widthInfoPlayer = 100;
const heightInfoPlayer = 140;

function showFullCard(url) {
  fullCardWrapper.classList.remove("hidden");
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

function clearPlayersHand() {
  handTopPlayer.lengh = 0;
  handLeftPlayer.legnth = 0;
  handRightPlayer.length = 0;
  handBottomPlayer.length = 0;
}

function playerHandFilling(hand, name, left, top, width, height) {
  hand.push({
    name,
    left,
    top,
    width,
    height,
  });
}

function drawTopPlayer(widthBoard) {
  // Игрок сверху
  const xTopPlayer = Math.ceil(widthBoard * 0.35);
  const firstOpponent = clientPlayer.getInfoAboutUsersInRoomArray()
    .find((opponent) => opponent.id === opponentsUUID[0]);

  ctx.strokeRect(xTopPlayer, 0, widthInfoPlayer, heightInfoPlayer);
  const imgTopPlayer = new Image();
  imgTopPlayer.src = firstOpponent.photoAddress || avatar;
  imgTopPlayer.onload = function loadAvatarTop() {
    ctx.drawImage(imgTopPlayer, xTopPlayer, 0, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "18px serif";
  ctx.fillText("Player 1", xTopPlayer + 10, heightInfoPlayer - 25);
  ctx.fillText(`Coin: ${firstOpponent.money || 3}`, xTopPlayer + 10, heightInfoPlayer - 5);

  ctx.strokeRect(xTopPlayer + widthInfoPlayer + padding, 0, 400, 140);

  const firstUserCards = firstOpponent.cards || basicHand;
  for (let i = 0, k = 1; i < firstUserCards.length; i += 1, k += 1) {
    const img = new Image();
    img.src = allCards[firstUserCards[i]];
    img.onload = function loadCardsTop() {
      ctx.drawImage(img, xTopPlayer + widthInfoPlayer + padding * k, 0, 100, 140);
    };
    playerHandFilling(handTopPlayer, allCards[firstUserCards[i]],
      xTopPlayer + widthInfoPlayer + padding * k, 0, 100, 140);
  }
}

function tryDrawLeftPlayer(widthBoard, heightBoard) {
  if (clientPlayer.getInfoAboutUsersInRoomArray().length >= 2) {
    const xLeftPlayer = Math.ceil(widthBoard * 0.1);
    const yLeftPlayer = Math.ceil(heightBoard * 0.25);
    const secondOpponent = clientPlayer.getInfoAboutUsersInRoomArray()
      .find((opponent) => opponent.id === opponentsUUID[1]);

    ctx.strokeRect(xLeftPlayer, yLeftPlayer, widthInfoPlayer, heightInfoPlayer);
    const imgLeftPlayer = new Image();
    imgLeftPlayer.src = secondOpponent.photoAddress || avatar;
    imgLeftPlayer.onload = function loadAvatarLeft() {
      ctx.drawImage(imgLeftPlayer, xLeftPlayer, yLeftPlayer, widthInfoPlayer, heightInfoPlayer - 40);
    };
    ctx.font = "18px serif";
    ctx.fillText("Player 2", xLeftPlayer + 10, yLeftPlayer + heightInfoPlayer - 25);
    ctx.fillText(`Coin: ${secondOpponent.money || 3}`, xLeftPlayer + 10, yLeftPlayer + heightInfoPlayer - 5);

    ctx.strokeRect(xLeftPlayer, yLeftPlayer + heightInfoPlayer + padding, 400, 140);

    const secondUserCards = secondOpponent.cards ? secondOpponent.cards : basicHand;
    for (let i = 0, k = 0; i < secondUserCards.length; i += 1, k += 1) {
      const img = new Image();
      img.src = allCards[secondUserCards[i]];
      img.onload = function loadCardsLeft() {
        ctx.drawImage(img, xLeftPlayer + padding * k, yLeftPlayer + heightInfoPlayer + padding, 100, 140);
      };
      playerHandFilling(handLeftPlayer, allCards[secondUserCards[i]],
        xLeftPlayer + padding * k, yLeftPlayer + heightInfoPlayer + padding, 100, 140);
    }
  }
}

function tryDrawRightPlayer(widthBoard, heightBoard) {
  if (clientPlayer.getInfoAboutUsersInRoomArray().length >= 3) {
    const xRightPlayer = Math.ceil(widthBoard * 0.8);
    const yRightPlayer = Math.ceil(heightBoard * 0.25);
    const thirdOpponent = clientPlayer.getInfoAboutUsersInRoomArray()
      .find((opponent) => opponent.id === opponentsUUID[2]);

    ctx.strokeRect(xRightPlayer, yRightPlayer, widthInfoPlayer, heightInfoPlayer);
    const imgRightPlayer = new Image();
    imgRightPlayer.src = thirdOpponent.photoAddress || avatar;
    imgRightPlayer.onload = function loadAvatarRight() {
      ctx.drawImage(imgRightPlayer, xRightPlayer, yRightPlayer, widthInfoPlayer, heightInfoPlayer - 40);
    };
    ctx.font = "18px serif";
    ctx.fillText("Player 3", xRightPlayer + 10, yRightPlayer + heightInfoPlayer - 25);
    ctx.fillText(`Coin: ${thirdOpponent.money || 3}`, xRightPlayer + 10, yRightPlayer + heightInfoPlayer - 5);

    ctx.strokeRect(xRightPlayer - 300, yRightPlayer + heightInfoPlayer + padding, 400, 140);

    const thirdUserCards = thirdOpponent.cards ? thirdOpponent.cards : basicHand;
    for (let i = 0, k = 0; i < thirdUserCards.length; i += 1, k += 1) {
      const img = new Image();
      img.src = allCards[thirdUserCards[i]];
      img.onload = function loadCardsRight() {
        ctx.drawImage(img, xRightPlayer - 300 + padding * k, yRightPlayer + heightInfoPlayer + padding, 100, 140);
      };
      playerHandFilling(handRightPlayer, allCards[thirdUserCards[i]],
        xRightPlayer - 300 + padding * k, yRightPlayer + heightInfoPlayer + padding, 100, 140);
    }
  }
}

function drawBottomPlayer(widthBoard, heightBoard) {
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
  ctx.fillText(`Coin: ${clientPlayer.getRegistrationData().money || 3}`, xBottomPlayer + 10,
    yBottomPlayer + heightInfoPlayer);

  ctx.strokeRect(xBottomPlayer + widthInfoPlayer + padding, yBottomPlayer, 1200, heightInfoPlayer + padding);

  const yourHand = clientPlayer.getRegistrationData().cards || basicHand;
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
      playerHandFilling(handBottomPlayer, allCards[yourHand[i]],
        xBottomPlayer + widthInfoPlayer + padding + (widthInfoPlayer / 2 + padding) * k,
        y, 50, 70);
    };
  }
}

export function drawBoard() {
  clearPlayersHand();

  const widthBoard = wrapperBoard.offsetWidth;
  const heightBoard = wrapperBoard.offsetHeight;

  board.setAttribute("width", widthBoard);
  board.setAttribute("height", heightBoard);

  ctx.clearRect(0, 0, board.width, board.height);
  drawTopPlayer(widthBoard);
  tryDrawLeftPlayer(widthBoard, heightBoard);
  tryDrawRightPlayer(widthBoard, heightBoard);
  drawBottomPlayer(widthBoard, heightBoard);
}

function isClickOnPlayerHand(x, y, hand) {
  for (let i = 0; i < hand.length; i += 1) {
    const card = hand[i];
    if (y > card.top && y < card.top + card.height && x > card.left && x < card.left + card.width) {
      showFullCard(card.name);
      return true;
    }
  }
  return false;
}

function checkClickOnPlayersHand(x, y) {
  if (isClickOnPlayerHand(x, y, handBottomPlayer)
    || isClickOnPlayerHand(x, y, handTopPlayer)
    || isClickOnPlayerHand(x, y, handLeftPlayer)
    || isClickOnPlayerHand(x, y, handRightPlayer)) {
    return true;
  }
  return false;
}

export default function createBoard() {
  opponentsUUID[0] = clientPlayer.getInfoAboutUsersInRoomArray()[0].id;
  if (clientPlayer.getInfoAboutUsersInRoomArray()[1]) {
    opponentsUUID[1] = clientPlayer.getInfoAboutUsersInRoomArray()[1].id;
  }

  if (clientPlayer.getInfoAboutUsersInRoomArray()[2]) {
    opponentsUUID[2] = clientPlayer.getInfoAboutUsersInRoomArray()[2].id;
  }

  drawBoard();

  board.addEventListener("click", (event) => {
    const box = board.getBoundingClientRect();

    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    checkClickOnPlayersHand(x, y);
  });
}

function tryActivateSpecialButtonsByNewCardName(newCardName) {
  switch (newCardName) {
    case "telecentre": {
      stealMoney.classList.remove("hidden");
      break;
    }
    case "port": {
      portBonus.classList.remove("hidden");
      break;
    }
    case "railwayStation": {
      throwCubes2.classList.remove("hidden");
      break;
    }
    case "businessCenter": {
      swapCards.classList.remove("hidden");
      break;
    }
    default: {
      break;
    }
  }
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

  tryActivateSpecialButtonsByNewCardName(newCardName);

  newImg.onload = function addCardsBottom() {
    if (x + padding + widthCard <= xBottomPlayer + 1200) {
      playerHandFilling(handBottomPlayer, newCardName, x + widthCard + padding, y, 50, 70);
      ctx.drawImage(newImg, x + widthCard + padding, y, widthCard, heightCard);
    } else {
      x = xBottomPlayer + widthCard * 2 + padding;
      y = y + padding + heightCard;
      playerHandFilling(handBottomPlayer, newCardName, x, y, 50, 70);
      ctx.drawImage(newImg, x, y, widthCard, heightCard);
    }
  };
}

startGame.addEventListener("click", () => {
  sendStartMessage(clientPlayer.getWs(), clientPlayer.getRoomID());
});

export function hideStartGameButton() {
  startGame.classList.add("hidden");
}

holdTurn.addEventListener("click", () => {
  sendHoldMessage(clientPlayer.getWs(), clientPlayer.getRoomID());
});

throwCubes.addEventListener("click", () => {
  sendThrowCubeMessage(clientPlayer.getWs(), clientPlayer.getRoomID(), 1);
});

throwCubes2.addEventListener("click", () => {
  sendThrowCubeMessage(clientPlayer.getWs(), clientPlayer.getRoomID(), 2);
});

swapCards.addEventListener("click", () => {
  swapWrapper.classList.remove("hidden");
});

backSwapPlayer.addEventListener("click", () => {
  swapWrapper.classList.add("hidden");
});

backSwap.addEventListener("click", () => {
  swapWrapper.classList.remove("hidden");
  swapCardsWrapper.classList.add("hidden");
});

stealMoney.addEventListener("click", () => {
  stealWrapper.classList.remove("hidden");
});

function steal(uuid) {
  sendStealMessage(clientPlayer.getWs(), clientPlayer.getRoomID(), uuid);
  stealWrapper.classList.add("hidden");
}

stealPlayer1.addEventListener("click", () => {
  steal(opponentsUUID[0]);
});

stealPlayer2.addEventListener("click", () => {
  steal(opponentsUUID[1]);
});

stealPlayer3.addEventListener("click", () => {
  steal(opponentsUUID[2]);
});

backStealPlayer.addEventListener("click", () => {
  stealWrapper.classList.add("hidden");
});

portBonus.addEventListener("click", () => {
  sendAcceptPortBonusMessage(clientPlayer.getWs(), clientPlayer.getRoomID());
});
