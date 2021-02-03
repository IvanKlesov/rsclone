const loginButton = document.getElementById("login");
const authContainer = document.getElementById("auth-container");
const backGoogleAuthBtn = document.getElementById("back-google-auth-btn");

export default function initAuth() {
  console.log(userID);
  console.log(userName);
  console.log(userPhotoAdress);

  loginButton.addEventListener("click", () => {
    console.log(userID);
    console.log(userName);
    console.log(userPhotoAdress);
    authContainer.classList.remove("hide");
  });

  if (backGoogleAuthBtn) {
    backGoogleAuthBtn.addEventListener("click", () => {
      authContainer.classList.add("hide");
    });
  }
}
