import { Player } from "../entities/Player";
import promptSync from "prompt-sync";

const prompt = promptSync();

export function inValidAttribute(attribute: number): boolean {
  return !Number.isInteger(attribute) || attribute <= 0;
}
export function rollDice(): number {
  const minValue = 1,
    maxValue = 6;
  return minValue + Math.floor(Math.random() * (maxValue - minValue + 1));
}

export function inValidPlayerIds(
  defender: Player | undefined,
  attacker: Player | undefined,
  id1: number,
  id2: number
) {
  if (!defender) {
    console.log("\nPlayer with id:", id1, "does not exist.\n");
    return true;
  } else if (!attacker) {
    console.log("\nPlayer with id:", id2, "does not exist.\n");
    return true;
  } else if (id1 === id2) {
    console.log("\nIds can not be same for both the players.\n");
    return true;
  } else return false;
}

export function getMenuInput(): number {
  return Number(prompt("Enter your choice: "));
}

export function getPlayerDetailInput() {
  console.log("\n");
  const name = prompt("Enter Name: ");
  const health = Number(prompt("Enter health (positive integer): "));
  const strength = Number(prompt("Enter strength (positive integer): "));
  const attack = Number(prompt("Enter attack (positive integer): "));
  return { name: name ?? "Player", health, strength, attack };
}

export function getPlayerIds() {
  console.log("\n");
  const first_player_id = Number(
    prompt("Enter first player id (positive integer): ")
  );
  const second_player_id = Number(
    prompt("Enter second player id (positive integer): ")
  );
  return { id1: first_player_id, id2: second_player_id };
}
