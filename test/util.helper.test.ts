import { IPlayer } from "../types/entities.type";
import { inValidAttribute, inValidPlayerIds, rollDice } from "../utils/helper";

describe("rollDice function", () => {
  test("returns an integer", () => {
    const result = rollDice();
    expect(Number.isInteger(result)).toBe(true);
  });

  test("returns a number between 1 and 6", () => {
    const result = rollDice();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });
});

describe("inValidAttribute function", () => {
  test("checks a integer", () => {
    const result1 = inValidAttribute(6);
    expect(result1).toBe(false);
    const result2 = inValidAttribute(24.66);
    expect(result2).toBe(true);
  });
});

describe("invalidPlayerIds function", () => {
  test("check player exist or not", () => {
    const res = inValidPlayerIds(undefined, undefined, 0, 1);
    expect(res).toBe(true);
  });
  test("check both the ids are same", () => {
    const player1: IPlayer = {
      playerId: 0,
      name: "Player 1",
      health: 200,
      attack: 40,
      strength: 50,
    };
    const player2: IPlayer = {
      playerId: 0,
      name: "Player 1",
      health: 200,
      attack: 40,
      strength: 50,
    };
    const res = inValidPlayerIds(
      player1,
      player2,
      player1.playerId,
      player1.playerId
    );
    expect(res).toBe(true);
  });
  test("check for valid case", () => {
    const player1: IPlayer = {
      playerId: 0,
      name: "Player 1",
      health: 200,
      attack: 40,
      strength: 50,
    };
    const player2: IPlayer = {
      playerId: 0,
      name: "Player 1",
      health: 200,
      attack: 40,
      strength: 50,
    };
    const res = inValidPlayerIds(
      player1,
      player2,
      player1.playerId,
      player2.playerId
    );
    expect(res).toBe(true);
  });
});
