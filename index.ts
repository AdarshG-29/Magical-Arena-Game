import { Arena } from "./entities/Arena";

const magical_arena = new Arena();
magical_arena.addNewPlayer("Player one", 100, 200, 150);
magical_arena.addNewPlayer("Player two", 200, 150, 100);
magical_arena.showPlayers();
magical_arena.play(0, 1);
