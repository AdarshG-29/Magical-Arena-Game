import { IPlayer } from "../types/entities.type";

//defining Player class entity
export class Player implements IPlayer {
  playerId: number;
  name: string;
  health: number;
  strength: number;
  attack: number;
  constructor(
    playerId: number,
    name: string,
    health: number,
    strength: number,
    attack: number
  ) {
    this.playerId = playerId;
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.attack = attack;
  }
}
