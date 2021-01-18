export default class MachiCoroGame {
  // users = arrray of websockets?
  constructor(users) {
    this.users = users;
  }

  start() {
    this.users.forEach((user) => {
      user.createMachiCoroUser();
    });
  }

  configurateInfoAboutAllUsers() {

  }

  updateUserMoney(user) {
    
  }
}