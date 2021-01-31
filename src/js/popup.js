import "./slider";
import createShop from "./shop";

const popup = document.querySelector(".popup");
const mainMenu = document.querySelector(".main-menu");
const newGame = document.querySelector(".new-game");
const cards = document.querySelector(".cards");
const rules = document.querySelector(".rules");
// const settigns = document.querySelector(".settings");
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
