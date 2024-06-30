//defining arena class entity and all the required methods.
import { IArena, IResult } from "../types/entities.type";
import {
  displayAttackingPlayerStats,
  displayDefenderHealth,
  displayDefendingPlayerStats,
  displayPlayerDetails,
  displayWinnerName,
  showInvalidInputMessage,
  showInvalidPlayerMessage,
  showPlayerEliminatedMessage,
  showTotalPlayerMessage,
  showWelcomeMessage,
} from "../utils/consoleUtil";
import { inValidAttribute, inValidPlayerIds, rollDice } from "../utils/helper";
import { Player } from "./Player";

export class Arena implements IArena {
  total_players: number;
  private Players: Map<number, Player>; // we are using map to make the game for n players and not just for 2 players

  constructor() {
    this.total_players = 0;
    this.Players = new Map();
    showWelcomeMessage();
  }

  hasPlayer(playerId: number): boolean {
    return this.Players.has(playerId);
  }

  getPlayersCount(): number {
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
      showInvalidInputMessage();
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
    const player = this.Players.get(id);
    if (!player) {
      showInvalidPlayerMessage(id);
      return;
    }
    showPlayerEliminatedMessage(player.name);
    this.Players.delete(id);
  }

  showPlayers(): void {
    showTotalPlayerMessage(this.getPlayersCount());
    let playerCount = 1;
    this.Players.forEach((player) => {
      displayPlayerDetails(player, playerCount);
      playerCount += 1;
    });
  }

  play(id_first_player: number, id_second_player: number) {
    let attacker = this.Players.get(id_first_player);
    let defender = this.Players.get(id_second_player);
    if (
      inValidPlayerIds(defender, attacker, id_first_player, id_second_player) ||
      !defender ||
      !attacker
    )
      return -1;

    //swapping attacker and defender with respect to their health. As lower health player will attack first.
    if (defender.health < attacker.health) {
      [attacker, defender] = [defender, attacker];
    }

    while (defender.health > 0) {
      const attackerRolledDice = rollDice();
      const attacking_power = attacker.attack * attackerRolledDice;
      const defenderRolledDice = rollDice();
      const defending_power = defender.strength * defenderRolledDice;

      displayAttackingPlayerStats(
        attacker.name,
        attackerRolledDice,
        attacking_power
      );
      displayDefendingPlayerStats(
        defender.name,
        defenderRolledDice,
        defending_power
      );

      if (attacking_power > defending_power)
        defender.health = Math.max(
          0,
          defender.health - (attacking_power - defending_power)
        ); //if attacking power is more than defender's strength, then we will deduct it from defender's health.

      displayDefenderHealth(defender.name, defender.health);

      if (defender.health > 0) [attacker, defender] = [defender, attacker]; //here if condition implies that finally, the current attacker will win and the current defender will loose, and it wont swap it again after loosing the game.
    }
    const res: IResult = {
      winner: attacker.playerId,
      looser: defender.playerId,
    };
    displayWinnerName(attacker.name);
    this.eliminatePlayer(defender.playerId);
    return res;
  }
}
