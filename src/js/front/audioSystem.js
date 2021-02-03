import mainTheme from "../../assets/sounds/audioTheme.mp3";
import click from "../../assets/sounds/click.mp3";

export const allSounds = { mainTheme, click };

export class AudioSystem {
  constructor(url) {
    this.audio = document.createElement("audio");
    this.audio.src = url;
    this.volumeLow = document.querySelector(".volume-low");
    this.volumeMiddle = document.querySelector(".volume-middle");
    this.volumeMax = document.querySelector(".volume-max");
    this.volumeLow.style.backgroundColor = "white";
    this.volumeMiddle.style.backgroundColor = "white";
    this.volumeOff = document.getElementById("volumeOff");
    this.volumeOn = document.getElementById("volumeOn");
  }

  playAudio() {
    this.audio.play();
  }

  pauseAudio() {
    this.audio.pause();
  }

  loopAudio() {
    this.audio.setAttribute("loop", true);
  }

  lowVolume() {
    if (this.volumeMax.style.backgroundColor === "white") {
      this.volumeMax.style.backgroundColor = "#00acdc";
      this.audio.volume = 0.6;
    } else if (this.volumeMiddle.style.backgroundColor === "white") {
      this.volumeMiddle.style.backgroundColor = "#00acdc";
      this.audio.volume = 0.1;
    }
  }

  upVolume() {
    if (this.volumeMiddle.style.backgroundColor === "white") {
      this.volumeMax.style.backgroundColor = "white";
      this.audio.volume = 1;
    } else if (this.volumeLow.style.backgroundColor === "white") {
      this.volumeMiddle.style.backgroundColor = "white";
      this.audio.volume = 0.6;
    }
  }

  muttedVolume() {
    if (this.volumeOn.checked) {
      this.audio.muted = false;
    }
    if (this.volumeOff.checked) {
      this.audio.muted = true;
    }
  }
}
