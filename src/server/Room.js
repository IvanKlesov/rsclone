import { v4 as uuid } from "uuid";

export class Room {
  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.users = [];
    this.maxUsersCount = 5;
  }

  clients() {
    return this.users;
  }

  addUser(newUser) {
    if (this.users.length >= this.maxUsersCount) {
      return false;
    }
    newUser.roomID = this.id;
    this.users.push(newUser);
    return true;
  }

  removeAllUsers(clientsCallbackLogout) {
    console.log("callback");
    console.log(clientsCallbackLogout);
    this.users.forEach(client => {
      clientsCallbackLogout(client);
    });
    this.users.lenght = 0;
  }

  removeUser(user) {
    const userIndex = this.users.indexOf(user);
    if (userIndex > -1) {
      if (this.users[userIndex] === this.owner) {
        return false;
      }
      this.users.splice(userIndex, 1);
    }
    user.roomID = undefined;
    return true;
  }

  getRoomID() {
    return this.id;
  }

  setOwner(userOwner) {
    this.owner = userOwner;
    this.addUser(userOwner);
  }

  setMaxUsersCount(newMaxCount) {
    this.maxUsersCount = newMaxCount;
  }

  getMaxUsersCount() {
    return this.maxUsersCount;
  }
}

export default Room;
