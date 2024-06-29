import { Player } from "../entities/Player";

export function showWelcomeMessage() {
  console.log("\nWelcome to the magical arena!!\n");
}

export function showInvalidInputMessage() {
  console.log(
    "Invalid inputs!! Health, strength and attack all should be positive integers\n"
  );
}

export function showPlayerEliminatedMessage(name: string) {
  console.log("Player", name, "is eliminated\n");
}

export function showInvalidPlayerMessage(id: number) {
  console.log("No player with id =", id, "exists.\n");
}

export function showTotalPlayerMessage(size: number) {
  console.log("\ntotal players are:", size, "\n");
}

export function displayPlayerDetails(player: Player, playerNumber: number) {
  const { name, health, strength, attack, playerId } = player;
  console.log("Player", playerNumber, "\n");
  console.log(`\tName: ${name}`);
  console.log(`\tPlayer id: ${playerId}`);
  console.log(`\tHealth: ${health}`);
  console.log(`\tStrength: ${strength}`);
  console.log(`\tAttack: ${attack}`);
  console.log("\n");
}

export function displayPlayerStats(
  name: string,
  rolledDice: number,
  power: number
) {
  console.log();
  console.log(
    name,
    "rolled dice",
    rolledDice,
    "and attacks with the power",
    power
  );
}

export function displayDefenderHealth(name: string, health: number) {
  console.log("\nAfter Attack:\n");
  console.log(name, "has health:", health, "\n");
}

export function displayWinnerName(name: string) {
  console.log(`${name} is winner\n`);
}

export function showMenuItems() {
  console.log(
    "Options: \n\t1. Add new player\n\t2. Start playing\n\t3. Exit\n"
  );
}

export function showNotEnoughPlayerMessage() {
  console.log(
    "There should be atleast two players in the Arena. Please add more players.\n"
  );
}

export function exitMessage() {
  console.log("Exit...\n\n");
}
