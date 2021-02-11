import {
  portWrapper,
  backPort,
  portRadioText,
  victoryWrapper,
  loseWrapper,
  startGame,
  throwCubes2,
  swapCards,
  stealMoney,
  btnRadioTower,
} from "./gameBoardConsts";
import { clearBoard } from "./gameBoard";

export function unhidePortWrapper() {
  portWrapper.classList.remove("hidden");
}

export function unhidePortRadioWrapper() {
  portWrapper.classList.remove("hidden");
  portRadioText.classList.remove("hidden");
  backPort.classList.remove("hidden");
}

export function unhideVictoryWrapper() {
  victoryWrapper.classList.remove("hidden");
  setTimeout(() => {
    victoryWrapper.classList.add("hidden");
    startGame.classList.remove("hidden");
    throwCubes2.classList.add("hidden");
    swapCards.classList.add("hidden");
    stealMoney.classList.add("hidden");
    btnRadioTower.classList.add("hidden");
    clearBoard();
  }, 5000);
}

export function unhideLoseWrapper() {
  loseWrapper.classList.remove("hidden");
  setTimeout(() => {
    loseWrapper.classList.add("hidden");
    startGame.classList.remove("hidden");
    throwCubes2.classList.add("hidden");
    swapCards.classList.add("hidden");
    stealMoney.classList.add("hidden");
    btnRadioTower.classList.add("hidden");
    clearBoard();
  }, 5000);
}
