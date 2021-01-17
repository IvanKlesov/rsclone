import { v4 as uuid } from "uuid";
import clientMessageMethods from "./messages/clientMessageMethods";

export class Room {
  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.users = [];
  }

  clients() {
    return this.users;
  }

  addUser(newUser) {
    newUser.roomID = this.id;
    this.users.push(newUser);
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
}

export default Room;
