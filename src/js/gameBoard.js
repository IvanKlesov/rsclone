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

export default function createBoard() {
  const main = document.querySelector(".game-content");
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
  ctx.font = "24px serif";
  ctx.fillText("Player 1", xTopPlayer + 10, heightInfoPlayer - 10);

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
  const yLeftPlayer = Math.ceil(heightBoard * 0.4);
  ctx.strokeRect(xLeftPlayer, yLeftPlayer, widthInfoPlayer, heightInfoPlayer);
  const imgLeftPlayer = new Image();
  imgLeftPlayer.src = avatar;
  imgLeftPlayer.onload = function loadAvatarLeft() {
    ctx.drawImage(imgLeftPlayer, xLeftPlayer, yLeftPlayer, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "24px serif";
  ctx.fillText("Player 2", xLeftPlayer + 10, yLeftPlayer + heightInfoPlayer - 10);

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
  const yRightPlayer = Math.ceil(heightBoard * 0.4);
  ctx.strokeRect(xRightPlayer, yRightPlayer, widthInfoPlayer, heightInfoPlayer);
  const imgRightPlayer = new Image();
  imgRightPlayer.src = avatar;
  imgRightPlayer.onload = function loadAvatarRight() {
    ctx.drawImage(imgRightPlayer, xRightPlayer, yRightPlayer, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "24px serif";
  ctx.fillText("Player 3", xRightPlayer + 10, yRightPlayer + heightInfoPlayer - 10);

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
  ctx.strokeRect(xBottomPlayer, yBottomPlayer, widthInfoPlayer, heightInfoPlayer);
  const imgBottomPlayer = new Image();
  imgBottomPlayer.src = avatar;
  imgBottomPlayer.onload = function loadAvatarBottom() {
    ctx.drawImage(imgBottomPlayer, xBottomPlayer, yBottomPlayer, widthInfoPlayer, heightInfoPlayer - 40);
  };
  ctx.font = "24px serif";
  ctx.fillText("Player 4", xBottomPlayer + 10, yBottomPlayer + heightInfoPlayer - 10);

  ctx.strokeRect(xBottomPlayer + widthInfoPlayer + padding, yBottomPlayer, 800, 140);
  const handBottomPlayer = [];
  for (let i = 0, k = 1; i < basicHand.length; i += 1, k += 1) {
    const img = new Image();
    img.src = basicHand[i];
    img.onload = function loadCardsBottom() {
      ctx.drawImage(img, xBottomPlayer + widthInfoPlayer + padding * k, yBottomPlayer, 100, 140);
    };
    handBottomPlayer.push({
      name: basicHand[i],
      left: xRightPlayer + widthInfoPlayer + padding * k,
      top: yBottomPlayer,
      width: 100,
      height: 140,
    });
  }
}
