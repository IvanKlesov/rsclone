import mainTheme from "../../assets/sounds/audioTheme.mp3";
import click from "../../assets/sounds/click.mp3";

export const allSounds = [mainTheme, click];

export function playAudio(audio) {
  audio.play();
}

export function pauseAudio(audio) {
  audio.pause();
}
