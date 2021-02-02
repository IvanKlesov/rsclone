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

import wheatField2 from "../assets/images/ordinaryBuildings/wheatField.png";
import farm from "../assets/images/ordinaryBuildings/farm.png";
import flowerGarden from "../assets/images/ordinaryBuildings/flowerGarden.png";
import forest from "../assets/images/ordinaryBuildings/forest.png";
import longboat from "../assets/images/ordinaryBuildings/longboat.png";
import mine from "../assets/images/ordinaryBuildings/mine.png";
import appleOrchard from "../assets/images/ordinaryBuildings/appleOrchard.png";
import trawler from "../assets/images/ordinaryBuildings/trawler.png";

import bakery2 from "../assets/images/ordinaryBuildings/bakery.png";
import store from "../assets/images/ordinaryBuildings/store.png";
import flowerStore from "../assets/images/ordinaryBuildings/flowerStore.png";
import cheeseDairy from "../assets/images/ordinaryBuildings/cheeseDairy.png";
import furnitureFactory from "../assets/images/ordinaryBuildings/furnitureFactory.png";
import vegetableMarket from "../assets/images/ordinaryBuildings/vegetableMarket.png";
import groceryWarehouse from "../assets/images/ordinaryBuildings/groceryWarehouse.png";

import sushiBar from "../assets/images/ordinaryBuildings/sushiBar.png";
import cafe from "../assets/images/ordinaryBuildings/cafe.png";
import pizzeria from "../assets/images/ordinaryBuildings/pizzeria.png";
import diner from "../assets/images/ordinaryBuildings/diner.png";
import restaurant from "../assets/images/ordinaryBuildings/restaurant.png";

import businessCenter from "../assets/images/uniqueBuildings/businessCenter.png";
import stadium from "../assets/images/uniqueBuildings/stadium.png";
import telecentre from "../assets/images/uniqueBuildings/telecentre.png";
import publishingHouse from "../assets/images/uniqueBuildings/publishingHouse.png";
import tax from "../assets/images/uniqueBuildings/tax.png";

import port from "../assets/images/attractions/port.png";
import railwayStation from "../assets/images/attractions/railwayStation.png";
import shoppingCenter from "../assets/images/attractions/shoppingCenter.png";
import amusementPark from "../assets/images/attractions/amusementPark.png";
import radioTower from "../assets/images/attractions/radioTower.png";
import airport from "../assets/images/attractions/airport.png";

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
  /* cityHall, */
  wheatField,
  bakery,
  /*   shirtPort,
    shirtRailwayStation,
    shirtShoppingCenter,
    shirtAmusementPark,
    shirtRadioTower,
    shirtAirport, */
];

const allCards = [
  { name: "wheatField", url: wheatField2 },
  { name: "farm", url: farm },
  { name: "flowerGarden", url: flowerGarden },
  { name: "forest", url: forest },
  { name: "longboat", url: longboat },
  { name: "mine", url: mine },
  { name: "appleOrchard", url: appleOrchard },
  { name: "trawler", url: trawler },
  { name: "bakery", url: bakery2 },
  { name: "store", url: store },
  { name: "flowerStore", url: flowerStore },
  { name: "cheeseDairy", url: cheeseDairy },
  { name: "furnitureFactory", url: furnitureFactory },
  { name: "vegetableMarket", url: vegetableMarket },
  { name: "groceryWarehouse", url: groceryWarehouse },
  { name: "sushiBar", url: sushiBar },
  { name: "cafe", url: cafe },
  { name: "pizzeria", url: pizzeria },
  { name: "diner", url: diner },
  { name: "restaurant", url: restaurant },
  { name: "businessCenter", url: businessCenter },
  { name: "stadium", url: stadium },
  { name: "telecentre", url: telecentre },
  { name: "publishingHouse", url: publishingHouse },
  { name: "tax", url: tax },
  { name: "port", url: port },
  { name: "railwayStation", url: railwayStation },
  { name: "shoppingCenter", url: shoppingCenter },
  { name: "amusementPark", url: amusementPark },
  { name: "radioTower", url: radioTower },
  { name: "airport", url: airport },
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

const wrapperBoard = document.querySelector(".game-board-wrapper");
const board = document.querySelector(".game-board");
const ctx = board.getContext("2d");
const handTopPlayer = [];
const handLeftPlayer = [];
const handRightPlayer = [];
const handBottomPlayer = [];
const padding = 20;

export default function createBoard() {
  const widthBoard = wrapperBoard.offsetWidth;
  const heightBoard = wrapperBoard.offsetHeight;
  const widthInfoPlayer = 100;
  const heightInfoPlayer = 140;

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

  for (let i = 0, k = 0; i < basicHand.length; i += 1, k += 1) {
    const img = new Image();
    img.src = basicHand[i];
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
        name: basicHand[i],
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

export function drawNewCard( newCardName) {
  const widthBoard = wrapperBoard.offsetWidth;

  const widthCard = 50;
  const heightCard = 70;

  const xBottomPlayer = Math.ceil(widthBoard * 0.1);

  let x = handBottomPlayer[handBottomPlayer.length - 1].left;
  let y = handBottomPlayer[handBottomPlayer.length - 1].top;
  const newImg = new Image();

  for (let i = 0; i < allCards.length; i += 1) {
    if (allCards[i].name === newCardName) newImg.src = allCards[i].url;
  }

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
