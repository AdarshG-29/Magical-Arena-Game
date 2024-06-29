//defining arena class entity and all the required methods.

import { inValidAttribute } from "../utils/helper";
import { Player } from "./Player";

export class Arena {
  total_players: number;
  private Players: Map<number, Player>;

  constructor() {
    this.total_players = 0;
    this.Players = new Map();
    console.log("Welcome to the magical arena!!\n");
  }

  hasPlayer(playerId: number): boolean {
    return this.Players.has(playerId);
  }

  getTotalPlayers(): number {
    return this.Players.size;
  }

  addNewPlayer(
    name: string,
    health: number,
    strength: number,
    attack: number
  ): number {
    //displaying invalid input messages
    if (inValidAttribute(health)) {
      console.log("Invalid input!! Health should be a positive integer");
      return -1;
    }
    if (inValidAttribute(strength)) {
      console.log("Invalid input!! Strength should be a positive integer");
      return -1;
    }
    if (inValidAttribute(attack)) {
      console.log("Invalid input!! Attack should be a positive integer");
      return -1;
    }
    const playerId = this.total_players;
    const newPlayer = new Player(playerId, name, health, strength, attack);
    this.Players.set(playerId, newPlayer);
    this.total_players += 1;
    return playerId;
  }
}
