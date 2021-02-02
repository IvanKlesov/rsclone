import "./slider";
import createShop from "./shop";
import { allSounds, playAudio, pauseAudio } from "./allSounds";

const popup = document.querySelector(".popup");
const mainMenu = document.querySelector(".main-menu");
const newGame = document.querySelector(".new-game");
const cards = document.querySelector(".cards");
const rules = document.querySelector(".rules");
const settigns = document.querySelector(".settings");
const allcards = document.querySelector(".all-cards");
const rulesCategorie = document.querySelector(".rules-categorie");
const settingsCategorie = document.querySelector(".settings-categorie-wrapper");
const shop = document.querySelector(".shop");
const backBtnCards = document.querySelector(".btn-back-cards");
const backBtnRules = document.querySelector(".btn-back-rules");
const backBtnSettings = document.querySelector(".btn-back-settings");
const backBtnShop = document.querySelector(".btn-back-shop");
const shopBtn = document.querySelector(".btn-shop");
const shopBlue = document.querySelector(".shop-blue");
const shopGreen = document.querySelector(".shop-green");
const shopRed = document.querySelector(".shop-red");
const shopPurple = document.querySelector(".shop-purple");
const showAttractions = document.querySelector(".shop-attractions");
const chat = document.querySelector(".chat");
const btnChat = document.querySelector(".btn-chat");
const closeChat = document.querySelector(".close-chat");
const closeRoom = document.getElementById("getOutRoomBtn");
const gameContent = document.querySelector(".game-content");
const backToMenu = document.querySelector(".back-to-menu");
const navBtn = document.querySelector(".nav-btn");
const fullCardBtn = document.querySelector(".full-card-btn");
const fullCardWrapper = document.querySelector(".full-card-wrapper");
const btnPlus = document.querySelector(".btn-plus");
const btnMinus = document.querySelector(".btn-minus");
const volumeLow = document.querySelector(".volume-low");
const volumeMiddle = document.querySelector(".volume-middle");
const volumeMax = document.querySelector(".volume-max");
const volumeOff = document.getElementById("volumeOff");
const volumeOn = document.getElementById("volumeOn");

const audioTheme = document.createElement("audio");
audioTheme.classList.add("audioTheme");
audioTheme.src = allSounds[0];
audioTheme.setAttribute("loop", true);
audioTheme.volume = 0.6;

volumeLow.style.backgroundColor = "white";
volumeMiddle.style.backgroundColor = "white";

function upVolume() {
  if (volumeMiddle.style.backgroundColor === "white") {
    volumeMax.style.backgroundColor = "white";
    audioTheme.volume = 1;
  } else if (volumeLow.style.backgroundColor === "white") {
    volumeMiddle.style.backgroundColor = "white";
    audioTheme.volume = 0.6;
  }
}

function lowVolume() {
  if (volumeMax.style.backgroundColor === "white") {
    volumeMax.style.backgroundColor = "#00acdc";
    audioTheme.volume = 0.6;
  } else if (volumeMiddle.style.backgroundColor === "white") {
    volumeMiddle.style.backgroundColor = "#00acdc";
    audioTheme.volume = 0.1;
  }
}

function muttedVolume() {
  if (volumeOn.checked) {
    audioTheme.muted = false;
  }
  if (volumeOff.checked) {
    audioTheme.muted = true;
  }
}

function openCategories(categorie) {
  mainMenu.classList.add("hidden");
  categorie.classList.remove("hidden");
}

function closeCategories(categorie) {
  categorie.classList.add("hidden");
  mainMenu.classList.remove("hidden");
}

function openShop() {
  shop.classList.remove("hidden");
  createShop(".picture-blue");
}

function closeShop() {
  shop.classList.add("hidden");
}

cards.addEventListener("click", () => {
  openCategories(allcards);
});

rules.addEventListener("click", () => {
  openCategories(rulesCategorie);
});

settigns.addEventListener("click", () => {
  openCategories(settingsCategorie);
});

shopBtn.addEventListener("click", openShop);

newGame.addEventListener("click", () => {
  popup.classList.add("hidden");
  playAudio(audioTheme);
});

backBtnCards.addEventListener("click", () => {
  closeCategories(allcards);
});

backBtnRules.addEventListener("click", () => {
  closeCategories(rulesCategorie);
});

backBtnSettings.addEventListener("click", () => {
  closeCategories(settingsCategorie);
});

backBtnShop.addEventListener("click", closeShop);

shopBlue.addEventListener("click", () => {
  createShop(".picture-blue");
});

shopGreen.addEventListener("click", () => {
  createShop(".picture-green");
});

shopRed.addEventListener("click", () => {
  createShop(".picture-red");
});

shopPurple.addEventListener("click", () => {
  createShop(".picture-purple");
});

showAttractions.addEventListener("click", () => {
  createShop(".picture-attractions");
});

btnChat.addEventListener("click", () => {
  chat.classList.remove("hidden");
});

closeChat.addEventListener("click", () => {
  chat.classList.add("hidden");
});

closeRoom.addEventListener("click", () => {
  gameContent.classList.add("hidden");
});

backToMenu.addEventListener("click", () => {
  popup.classList.remove("hidden");
  navBtn.classList.add("hidden");
  pauseAudio(audioTheme);
});

fullCardBtn.addEventListener("click", () => {
  fullCardWrapper.classList.add("hidden");
});

btnPlus.addEventListener("click", upVolume);
btnMinus.addEventListener("click", lowVolume);
volumeOff.addEventListener("click", muttedVolume);
volumeOn.addEventListener("click", muttedVolume);
