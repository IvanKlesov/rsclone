import { sendSwapCardsMessage } from "../machiCoroGame/front/machiCoroClientMessages";
import {
  padding, opponentsUUID, swapCardsWrapper, swapWrapper,
} from "./gameBoardConsts";
import clientPlayer from "./clientPlayer";
import { allCards } from "./allCards";

const swapPlayer1 = document.querySelector(".swap-player1");
const swapPlayer2 = document.querySelector(".swap-player2");
const swapPlayer3 = document.querySelector(".swap-player3");
const cardSwap = [
  "wheatField",
  "farm",
  "flowerGarden",
  "forest",
  "longboat",
  "mine",
  "appleOrchard",
  "trawler",
  "bakery",
  "store",
  "flowerStore",
  "cheeseDairy",
  "furnitureFactory",
  "vegetableMarket",
  "groceryWarehouse",
  "sushiBar",
  "cafe",
  "pizzeria",
  "diner",
  "restaurant",
];

function swapYourCard(idOpponent, cardOpponent) {
  const yourHand = clientPlayer.getRegistrationData().cards || basicHand;
  const cardsForSwap = [];
  for (let i = 0; i < yourHand.length; i += 1) {
    if (cardSwap.includes(yourHand[i])) {
      cardsForSwap.push(yourHand[i]);
    }
  }

  const opponentCanvas = document.querySelector(".cards-opponents");
  const ctx = opponentCanvas.getContext("2d");
  const swapCards = document.querySelector(".swap-cards-content");
  const border = 7;
  const widthCanvas = swapCards.offsetWidth - (border * 2 + padding * 2);
  const widthCards = 180;
  const heightCards = 275;
  // check line and height calculatin
  const lineCanvas = Math.ceil((cardsForSwap.length * (widthCards + padding)) / widthCanvas);
  const heightCanvas = lineCanvas * (heightCards + padding);
  const activeCards = [];

  opponentCanvas.setAttribute("width", widthCanvas);
  opponentCanvas.setAttribute("height", heightCanvas);

  ctx.clearRect(0, 0, opponentCanvas.width, opponentCanvas.height);

  let x = 0;
  let y = 0;

  for (let j = 0; j < cardsForSwap.length; j += 1) {
    const img = new Image();
    img.src = allCards[cardsForSwap[j]];
    activeCards.push({
      name: cardsForSwap[j].name,
      left: x,
      top: y,
      width: 180,
      height: 275,
    });

    ctx.drawImage(img, x, y, 180, 275);
    x += widthCards + padding;
    if (x > widthCanvas) {
      x = 0;
      y += heightCards + padding;
    }
  }
  opponentCanvas.addEventListener("click", (event) => {
    const box = opponentCanvas.getBoundingClientRect();

    const xEvent = event.clientX - box.left;
    const yEvent = event.clientY - box.top;

    activeCards.forEach((card) => {
      if (
        yEvent > card.top
        && yEvent < card.top + card.height
        && xEvent > card.left
        && xEvent < card.left + card.width
      ) {
        const ws = clientPlayer.getWs();
        const roomID = clientPlayer.getRoomID();
        const commandString = `${idOpponent} ${card.name} ${cardOpponent}`;
        sendSwapCardsMessage(ws, roomID, commandString);
        swapCardsWrapper.classList.add("hidden");
      }
    });
  });
}

function drawHandOpponents(idOpponent) {
  const firstOpponent = clientPlayer.getInfoAboutUsersInRoomArray().find((opponent) => opponent.id === idOpponent);
  const opponentsCards = firstOpponent.cards || basicHand;
  const cardsForSwap = [];
  for (let i = 0; i < opponentsCards.length; i += 1) {
    if (cardSwap.includes(opponentsCards[i])) {
      cardsForSwap.push(opponentsCards[i]);
    }
  }

  console.log(cardsForSwap);
  const opponentCanvas = document.querySelector(".cards-opponents");
  const ctx = opponentCanvas.getContext("2d");
  const swapCards = document.querySelector(".swap-cards-content");
  const border = 7;
  const widthCanvas = swapCards.offsetWidth - (border * 2 + padding * 2);
  const widthCards = 180;
  const heightCards = 275;
  // check line and height calculatin
  const lineCanvas = Math.ceil((cardsForSwap.length * (widthCards + padding)) / widthCanvas);
  const heightCanvas = lineCanvas * (heightCards + padding);
  const activeCards = [];

  opponentCanvas.setAttribute("width", widthCanvas);
  opponentCanvas.setAttribute("height", heightCanvas);

  ctx.clearRect(0, 0, opponentCanvas.width, opponentCanvas.height);

  let x = 0;
  let y = 0;

  for (let j = 0; j < cardsForSwap.length; j += 1) {
    const img = new Image();
    img.src = allCards[cardsForSwap[j]];
    activeCards.push({
      name: cardsForSwap[j],
      left: x,
      top: y,
      width: 180,
      height: 275,
    });

    ctx.drawImage(img, x, y, 180, 275);
    x += widthCards + padding;
    if (x > widthCanvas) {
      x = 0;
      y += heightCards + padding;
    }
  }
  console.log(activeCards);
  opponentCanvas.addEventListener("click", (event) => {
    const box = opponentCanvas.getBoundingClientRect();

    const xEvent = event.clientX - box.left;
    const yEvent = event.clientY - box.top;

    activeCards.forEach((card) => {
      if (
        yEvent > card.top
        && yEvent < card.top + card.height
        && xEvent > card.left
        && xEvent < card.left + card.width
      ) {
        swapYourCard(idOpponent, card.name);
      }
    });
  });
}

swapPlayer1.addEventListener("click", () => {
  swapCardsWrapper.classList.remove("hidden");
  swapWrapper.classList.add("hidden");
  drawHandOpponents(opponentsUUID[0]);
});

swapPlayer2.addEventListener("click", () => {
  swapCardsWrapper.classList.remove("hidden");
  swapWrapper.classList.add("hidden");
  drawHandOpponents(opponentsUUID[1]);
});

swapPlayer3.addEventListener("click", () => {
  swapCardsWrapper.classList.remove("hidden");
  swapWrapper.classList.add("hidden");
  drawHandOpponents(opponentsUUID[2]);
});
