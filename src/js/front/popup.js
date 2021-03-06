import "./slider";
import createShop from "./shop";
import { AudioSystem, allSounds } from "./audioSystem";

const popup = document.querySelector(".popup");
const mainMenu = document.querySelector(".main-menu");
const newGame = document.querySelector(".new-game");
const cards = document.querySelector(".cards");
const rules = document.querySelector(".rules");
const settigns = document.querySelector(".settings");
const settingsCategorie = document.querySelector(".settings-categorie-wrapper");
const backBtnSettings = document.querySelector(".btn-back-settings");
const allcards = document.querySelector(".all-cards");
const rulesCategorie = document.querySelector(".rules-categorie");
const shop = document.querySelector(".shop");
const backBtnCards = document.querySelector(".btn-back-cards");
const backBtnRules = document.querySelector(".btn-back-rules");
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
const volumeOff = document.getElementById("volumeOff");
const volumeOn = document.getElementById("volumeOn");

const mainTheme = new AudioSystem(allSounds.mainTheme);
mainTheme.volume();
mainTheme.loopAudio();

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

shopBtn.addEventListener("click", openShop);

newGame.addEventListener("click", () => {
  popup.classList.add("hidden");
  mainTheme.playAudio();
});

backBtnCards.addEventListener("click", () => {
  closeCategories(allcards);
});

backBtnRules.addEventListener("click", () => {
  closeCategories(rulesCategorie);
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
  mainTheme.pauseAudio();
});

fullCardBtn.addEventListener("click", () => {
  fullCardWrapper.classList.add("hidden");
});

settigns.addEventListener("click", () => {
  openCategories(settingsCategorie);
});

backBtnSettings.addEventListener("click", () => {
  closeCategories(settingsCategorie);
});

btnPlus.addEventListener("click", () => {
  mainTheme.upVolume();
});
btnMinus.addEventListener("click", () => {
  mainTheme.lowVolume();
});

volumeOff.addEventListener("click", () => {
  mainTheme.muttedVolume();
});

volumeOn.addEventListener("click", () => {
  mainTheme.muttedVolume();
});
