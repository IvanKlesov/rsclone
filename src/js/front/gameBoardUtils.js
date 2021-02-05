import { portWrapper, backPort, portRadioText } from "./gameBoardConsts";

export function unhidePortWrapper(x) {
  portWrapper.classList.remove("hidden");
  console.log(11111);
}

export function unhidePortRadioWrapper() {
  console.log(22222);
  portWrapper.classList.remove("hidden");
  portRadioText.classList.remove("hidden");
  backPort.classList.remove("hidden");
}
