//defining arena class entity and all the required methods.

import { inValidAttribute, rollDice } from "../utils/helper";
import { Player } from "./Player";

export class Arena {
  total_players: number;
  private Players: Map<number, Player>; // we are using map to make the game for n players and not just for 2 players

  constructor() {
    this.total_players = 0;
    this.Players = new Map();
    console.log("\nWelcome to the magical arena!!\n");
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
    //displaying invalid input message
    if (
      inValidAttribute(health) ||
      inValidAttribute(strength) ||
      inValidAttribute(attack)
    ) {
      console.log(
        "Invalid inputs!! Health, strength and attack all should be positive integers\n"
      );
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
    console.log(`\ntotal players are: ${this.getTotalPlayers()}\n`);
    let i = 1;
    this.Players.forEach((player, id) => {
      const { name, health, strength, attack } = player;
      console.log("Player ", i, "\n");
      console.log(`\tName: ${name}`);
      console.log(`\tPlayer id: ${id}`);
      console.log(`\tHealth: ${health}`);
      console.log(`\tStrength: ${strength}`);
      console.log(`\tAttack: ${attack}`);
      console.log("\n");
      i += 1;
    });
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
        `\n${attacker.name} rolled dice ${attackerRolledDice} and attacks with the power ${attacking_power}`
      );
      console.log(
        `${defender.name} rolled dice ${defenderRolledDice} and defends with the strength ${defending_power}`
      );

      console.log("\nAfter Attack:\n");

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
