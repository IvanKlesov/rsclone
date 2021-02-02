const loginButton = document.getElementById("login");
const authContainer = document.getElementById("auth-container");

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
}
