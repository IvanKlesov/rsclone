import mainTheme from "../../assets/sounds/audioTheme.mp3";
import click from "../../assets/sounds/click.mp3";

export const allSounds = { mainTheme, click };

export class AudioSystem {
  static createAudio(url) {
    const audio = document.createElement(audio);
    audio.src = url;
    return audio;
  }

  static playAudio(audio) {
    audio.play();
  }

  static pauseAudio(audio) {
    audio.pause();
  }

  static loopAudio(audio) {
    audio.setAttribute("loop", true);
  }
}

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
