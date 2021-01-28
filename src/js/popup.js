import "./slider";

const mainMenu = document.querySelector(".main-menu");
// const newGame = document.querySelector(".new-game");
const cards = document.querySelector(".cards");
const rules = document.querySelector(".rules");
// const settigns = document.querySelector(".settings");
const allcards = document.querySelector(".all-cards");
const rulesCategorie = document.querySelector(".rules-categorie");
const backBtnCards = document.querySelector(".btn-back-cards");
const backBtnRules = document.querySelector(".btn-back-rules");

function openCategories(categorie) {
  mainMenu.classList.add("hidden");
  categorie.classList.remove("hidden");
}

function closeCategories(categorie) {
  categorie.classList.add("hidden");
  mainMenu.classList.remove("hidden");
}

cards.addEventListener("click", () => {
  openCategories(allcards);
});

rules.addEventListener("click", () => {
  openCategories(rulesCategorie);
});

backBtnCards.addEventListener("click", () => {
  closeCategories(allcards);
});

backBtnRules.addEventListener("click", () => {
  closeCategories(rulesCategorie);
});
