const loginButton = document.getElementById("login");
const authContainer = document.getElementById("auth-container");
const backGoogleAuthBtn = document.getElementById("back-google-auth-btn");

export default function initAuth() {
  loginButton.addEventListener("click", () => {
    authContainer.classList.remove("hide");
  });

  if (backGoogleAuthBtn) {
    backGoogleAuthBtn.addEventListener("click", () => {
      authContainer.classList.add("hide");
    });
  }
}
