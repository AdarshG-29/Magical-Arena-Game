import { Arena } from "../entities/Arena";
import { IResult } from "../types/entities.type";

describe("Arena class", () => {
  describe("addNewPlayer method", () => {
    let arena: Arena;
    beforeEach(() => {
      arena = new Arena();
    });

    //test case for testing player's health
    test("arena players health should be a positive integer only.", () => {
      let id = arena.addNewPlayer("Player 1", -2, 150, 100);
      expect(id).toEqual(-1);
      id = arena.addNewPlayer("Player 1", 0, 200, 10);
      expect(id).toEqual(-1);
      id = arena.addNewPlayer("Player 1", 250.45, 400, 12);
      expect(id).toEqual(-1);
    });

    //test case for testing player's strength
    test("arena players strength should be a positive integer only.", () => {
      let id = arena.addNewPlayer("Player 1", 100, -2, 100);
      expect(id).toEqual(-1);
      id = arena.addNewPlayer("Player 1", 150, 0, 10);
      expect(id).toEqual(-1);
      id = arena.addNewPlayer("Player 1", 150, 23.45, 12);
      expect(id).toEqual(-1);
    });

    //test case for testing player's attack
    test("arena players attack should be a positive integer only.", () => {
      let id = arena.addNewPlayer("Player 1", 100, 150, -2);
      expect(id).toEqual(-1);
      id = arena.addNewPlayer("Player 1", 100, 200, 0);
      expect(id).toEqual(-1);
      id = arena.addNewPlayer("Player 1", 100, 400, 12.38);
      expect(id).toEqual(-1);
    });

    //test case to check whether a player is stored into map correctly or not.
    test("A newly added player should be present in the Arena", () => {
      const id = arena.addNewPlayer("Player 1", 100, 130, 150);
      expect(arena.hasPlayer(id)).toEqual(true);
    });

    //test case to check the correct players count
    test("Player count should be increase by 1 after addition of a new player", () => {
      const oldPlayerCount = arena.getPlayersCount();
      arena.addNewPlayer("new player", 100, 200, 300);
      const newPlayerCount = arena.getPlayersCount();

      expect(newPlayerCount).toEqual(oldPlayerCount + 1);
    });
  });

  describe("eliminatePlayer method", () => {
    let arena: Arena;
    beforeEach(() => {
      arena = new Arena();
    });

    //test case to check the player is eliminated or not
    test("The eliminated player should be removed from Arena", () => {
      const id = arena.addNewPlayer("new player", 100, 200, 300);
      arena.eliminatePlayer(id);
      expect(arena.hasPlayer(id)).toEqual(false);
    });

    //test case to check whether the arena player size is decemented or not, after elimination.
    test("The player's count should decrease by one after eliminating one player", () => {
      const id = arena.addNewPlayer("new player", 100, 200, 300);
      const totalCountOld = arena.getPlayersCount();
      arena.eliminatePlayer(id);
      const totalCountNew = arena.getPlayersCount();
      expect(totalCountNew).toEqual(totalCountOld - 1);
    });

    //test case to check a valid player will only be eliminated.
    test("if a player is not in arena then it should not be eliminated", () => {
      const id = arena.addNewPlayer("new player", 100, 200, 300);
      const totalCountOld = arena.getPlayersCount();
      const randomId = id + Math.ceil(Math.random() * (id + 1));
      arena.eliminatePlayer(randomId);
      const totalCountNew = arena.getPlayersCount();
      expect(totalCountNew).toEqual(totalCountOld);
    });
  });

  describe("play method", () => {
    let arena: Arena;
    beforeEach(() => {
      arena = new Arena();
    });

    //test case to handle empty arena
    test("play with empty arena", () => {
      expect(arena.play(0, 1)).toEqual(-1);
    });

    //test case to handle same id validation
    test("Players have same id", () => {
      let id1 = arena.addNewPlayer("player 1", 100, 200, 300);
      let id2 = arena.addNewPlayer("Player 2", 200, 300, 100);
      expect(arena.play(id1, id1)).toEqual(-1);
    });

    //test case if any player does not exist
    test("One of the player does not exist.", () => {
      const id1 = arena.addNewPlayer("Player 1", 100, 200, 300);
      const id2 = arena.addNewPlayer("Player 2", 200, 300, 100);
      expect(arena.play(id1, id2 + 10)).toEqual(-1);
    });

    //test case to check correct outcome of game play
    test("winner outcome", () => {
      const id1 = arena.addNewPlayer("Player 1", 100, 200, 300);
      const id2 = arena.addNewPlayer("Player 2", 200, 300, 100);
      const possibleOutComes: IResult[] = [
        { winner: id1, looser: id2 },
        { winner: id2, looser: id1 },
      ];
      const res: IResult = arena.play(id1, id2) as IResult;

      expect(possibleOutComes).toContainEqual(res); //to check, one player will win and other will loose.

      expect(arena.hasPlayer(res.winner)).toEqual(true); //to check the winner player should remain in the arena

      expect(arena.hasPlayer(res.looser)).toEqual(false); //to check the looser player shoulc be eliminated;
    });
  });
});
