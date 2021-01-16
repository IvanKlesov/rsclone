import { v4 as uuid } from "uuid";

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
  removeUser(user) {
    const userIndex = this.users.indexOf(user);
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
    }
    user.roomID = undefined;
  }
}

export default Room;
