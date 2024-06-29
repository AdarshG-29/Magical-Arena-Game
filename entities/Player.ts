//defining Player class entity
export class Player {
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
    this.strength = strength;
    this.attack = attack;
  }
}
