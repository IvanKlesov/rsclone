const loginButton = document.getElementById("login");
const authContainer = document.getElementById("auth-container");

export default function initAuth() {
  loginButton.addEventListener("click", () => {
    console.log(window.machiCoroClient);
    authContainer.classList.remove("hide");
  });
}