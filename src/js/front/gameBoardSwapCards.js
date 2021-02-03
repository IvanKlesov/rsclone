import { sendSwapCardsMessage } from "../machiCoroGame/front/machiCoroClientMessages";
import {
  padding,
  handBottomPlayer,
  handTopPlayer,
  handLeftPlayer,
  handRightPlayer,

  opponentsUUID,

  swapCardsWrapper,
  swapWrapper,
} from "./gameBoardConsts";
import clientPlayer from "./clientPlayer";

const swapPlayer1 = document.querySelector(".swap-player1");
const swapPlayer2 = document.querySelector(".swap-player2");
const swapPlayer3 = document.querySelector(".swap-player3");

function swapYourCard(idOpponent, cardOpponent) {
  const cardsForSwap = [];
  for (let i = 0; i < handBottomPlayer.length; i += 1) {
    const arr = handBottomPlayer[i].name.split("/");
    if (arr[4] === "ordinaryBuildings" || arr[4] === "startСards") {
      const obj = {
        url: handBottomPlayer[i].name,
        name: arr[4].substring(0, arr[4].length - 4),
      };
      cardsForSwap.push(obj);
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
  const lineCanvas = Math.ceil((playerHand.length * (widthCards + padding)) / widthCanvas);
  const heightCanvas = lineCanvas * (heightCards + padding);
  const activeCards = [];

  opponentCanvas.setAttribute("width", widthCanvas);
  opponentCanvas.setAttribute("height", heightCanvas);

  ctx.clearRect(0, 0, opponentCanvas.width, opponentCanvas.height);

  let x = 0;
  let y = 0;

  for (let j = 0; j < cardsForSwap.length; j += 1) {
    activeCards.push({
      name: cardsForSwap[j].name,
      url: cardsForSwap[j].url,
      left: x,
      top: y,
      width: 180,
      height: 275,
    });

    ctx.drawImage(cardsForSwap[j], x, y, 180, 275);
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
      if (yEvent > card.top && yEvent < card.top + card.height
        && xEvent > card.left && xEvent < card.left + card.width) {
        const ws = clientPlayer.getWs();
        const roomID = clientPlayer.getRoomID();
        const commandString = `${idOpponent} ${card.name} ${cardOpponent.name}`;
        sendSwapCardsMessage(ws, roomID, commandString);
      }
    });
  });
}

function drawHandOpponents(playerHand, idOpponent) {
  const cardsForSwap = [];
  for (let i = 0; i < playerHand.length; i += 1) {
    const arr = playerHand[i].name.split("/");
    if (arr[4] === "ordinaryBuildings" || arr[4] === "startСards") {
      const obj = {
        url: playerHand[i].name,
        name: arr[4].substring(0, arr[4].length - 4),
      };

      cardsForSwap.push(obj);
    }
  }

  console.log(playerHand, cardsForSwap);
  const opponentCanvas = document.querySelector(".cards-opponents");
  const ctx = opponentCanvas.getContext("2d");
  const swapCards = document.querySelector(".swap-cards-content");
  const border = 7;
  const widthCanvas = swapCards.offsetWidth - (border * 2 + padding * 2);
  const widthCards = 180;
  const heightCards = 275;
  // check line and height calculatin
  const lineCanvas = Math.ceil((playerHand.length * (widthCards + padding)) / widthCanvas);
  const heightCanvas = lineCanvas * (heightCards + padding);
  const activeCards = [];

  opponentCanvas.setAttribute("width", widthCanvas);
  opponentCanvas.setAttribute("height", heightCanvas);

  ctx.clearRect(0, 0, opponentCanvas.width, opponentCanvas.height);

  let x = 0;
  let y = 0;

  for (let j = 0; j < cardsForSwap.length; j += 1) {
    activeCards.push({
      name: cardsForSwap[j].name,
      url: cardsForSwap[j].url,
      left: x,
      top: y,
      width: 180,
      height: 275,
    });

    ctx.drawImage(cardsForSwap[j], x, y, 180, 275);
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
      if (yEvent > card.top && yEvent < card.top + card.height
        && xEvent > card.left && xEvent < card.left + card.width) {
        // cardOpponent = opponentCanvas ?????
        swapYourCard(idOpponent, opponentCanvas);// cardOpponent);
      }
    });
  });
}

swapPlayer1.addEventListener("click", () => {
  swapCardsWrapper.classList.remove("hidden");
  swapWrapper.classList.add("hidden");
  drawHandOpponents(handTopPlayer, opponentsUUID[0]);
});

swapPlayer2.addEventListener("click", () => {
  swapCardsWrapper.classList.remove("hidden");
  swapWrapper.classList.add("hidden");
  drawHandOpponents(handLeftPlayer, opponentsUUID[1]);
});

swapPlayer3.addEventListener("click", () => {
  swapCardsWrapper.classList.remove("hidden");
  swapWrapper.classList.add("hidden");
  drawHandOpponents(handRightPlayer, opponentsUUID[2]);
});
