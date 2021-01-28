import { v4 as uuid } from "uuid";
import { serverMessageMethods } from "../server/messages/serverMessageMethods";
import MachiCoroGame from "./machiCoroGame/back/MachiCoroGame";

export class Room {
  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.users = [];
    this.maxUsersCount = 5;
    this.owner = undefined;
  }

  startMachiCoroGame(websocket, webSocketOpetState) {
    if (this.users.length > 1) {
      if (this.MachiCoroGame === undefined) {
        this.MachiCoroGame = new MachiCoroGame(this.getUsers());
        this.MachiCoroGame.start(websocket, webSocketOpetState);
      } else if (this.MachiCoroGame && this.MachiCoroGame.gameIsOver) {
        this.MachiCoroGame = undefined;
        this.MachiCoroGame = new MachiCoroGame(this.getUsers());
        this.MachiCoroGame.start(websocket, webSocketOpetState);
      }
    }
  }

  getMachiCoroGame() {
    return this.MachiCoroGame;
  }

  machiCoroGameBuy(websocket, buyRequest) {
    if (this.MachiCoroGame) {
      this.MachiCoroGame.buy(websocket, buyRequest);
    }
  }

  machiCoroGameHold(websocket) {
    if (this.MachiCoroGame) {
      this.MachiCoroGame.hold(websocket);
    }
  }

  machiCoroGameThrowCube(websocket, numberOfCubes = 1) {
    if (this.MachiCoroGame) {
      this.MachiCoroGame.throwCubes(websocket, numberOfCubes);
    }
  }

  machiCoroGameSwapUserCards(websocket, secondUserID, firstUserCardName, secondUserCardName) {
    if (this.MachiCoroGame) {
      this.MachiCoroGame.swapUserCards(websocket, secondUserID, firstUserCardName, secondUserCardName);
    }
  }

  machiCoroGameSteal(websocket, secondUserID) {
    if (this.MachiCoroGame) {
      this.MachiCoroGame.steal(websocket, secondUserID);
    }
  }

  machiCoroGamePortBonusResult(websocket, result) {
    if (this.MachiCoroGame) {
      switch (result) {
        case "accept": {
          this.MachiCoroGame.acceptPortBonus(websocket);
          break;
        }
        case "reject": {
          this.MachiCoroGame.rejectPortBonus(websocket);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  machiCoroGameAcceptThrow(websocket) {
    if (this.MachiCoroGame) {
      this.MachiCoroGame.acceptThrow(websocket);
    }
  }

  getUsers() {
    return this.users;
  }

  clients() {
    return this.users.map((user) => user.getWs());
  }

  addUser(newUser) {
    if (this.users.length >= this.maxUsersCount) {
      return false;
    }
    if (this.MachiCoroGame !== undefined && !this.MachiCoroGame.gameIsOver) {
      return false;
    }
    newUser.roomID === this.id;
    if (this.users.indexOf(newUser) > -1) {
      return true;
    }
    this.users.push(newUser);
    return true;
  }

  removeAllUsers() {
    this.users.forEach((client) => {
      serverMessageMethods.getOutRoomAccept(client);
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
      if (this.getMachiCoroGame()) {
        this.getMachiCoroGame().checkUsersLength(userIndex);
      }
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

  getOwner() {
    return this.owner;
  }

  setMaxUsersCount(newMaxCount) {
    this.maxUsersCount = newMaxCount;
  }

  getMaxUsersCount() {
    return this.maxUsersCount;
  }
}

export default Room;
