//defining arena class entity and all the required methods.

import { inValidAttribute, rollDice } from "../utils/helper";
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

  //eliminate or delete player from Players map
  eliminatePlayer(id: number): void {
    if (this.Players.has(id)) {
      const player = this.Players.get(id);
      console.log(`${player?.name} is eliminated\n`);
      this.Players.delete(id);
    } else console.log(`No player with id = ${id} exists.\n`);
  }

  showPlayers(): void {
    console.log("\n");
    for (const [id, player] of this.Players) {
      const { name, health, strength, attack } = player;
      console.log(`Name: ${name}`);
      console.log(`Player id: ${id}`);
      console.log(`Health: ${health}`);
      console.log(`Strength: ${strength}`);
      console.log(`Attack: ${attack}`);
    }
  }

  play(id_first_player: number, id_second_player: number) {
    if (id_first_player === id_second_player) {
      console.log("Ids can not be same for both the players.\n");
      return;
    }
    let attacker = this.Players.get(id_first_player);
    let defender = this.Players.get(id_second_player);
    if (!attacker) {
      console.log(`Player with id: ${id_second_player} does not exist.\n`);
      return;
    }
    if (!defender) {
      console.log(`Player with id: ${id_first_player} does not exist.\n`);
      return;
    }
    //swapping attacker and defender with respect to their health. As lower health player will attack first.
    if (defender?.health < attacker?.health) {
      [attacker, defender] = [defender, attacker];
    }

    while (defender.health > 0) {
      const attackerRolledDice = rollDice();
      const attacking_power = attacker.attack * attackerRolledDice;
      const defenderRolledDice = rollDice();
      const defending_power = defender.strength * defenderRolledDice;

      console.log(
        `${attacker.name} rolled dice of ${attackerRolledDice} and attacks with the power ${attacking_power}`
      );
      console.log(
        `${defender.name} rolled dice of ${defenderRolledDice} and defends with the strength ${defending_power}`
      );

      console.log("After Attack:\n");

      if (attacking_power > defending_power)
        defender.health = Math.max(
          0,
          defender.health - (attacking_power - defending_power)
        ); //if attacking power is more than defender's strength, then we will deduct it from defender's health.

      console.log(`${defender.name} has health: ${defender.health}\n`);

      if (defender.health > 0) [attacker, defender] = [defender, attacker]; //the if condition implies that finally, the current attacker will win and the current defender will loose, and it wont swap it again after loosing the game.
    }
    console.log(`${attacker.name} is winner\n`);
    this.eliminatePlayer(defender.playerId);
  }
}
