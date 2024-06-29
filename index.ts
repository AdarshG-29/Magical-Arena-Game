import { Arena } from "./entities/Arena";
import promptSync from "prompt-sync";

const prompt = promptSync();
const magical_arena = new Arena();

function execute_magical_arena() {
  while (1) {
    magical_arena.showPlayers();
    console.log(
      "Options: \n\t1. Add new player\n\t2. Start playing\n\t3. Exit\n"
    );
    const option = Number(prompt("Enter your choice: "));
    if (option === 1) {
      console.log("\n");
      const name = prompt("Enter Name: ");
      const health = Number(prompt("Enter health (positive integer): "));
      const strength = Number(prompt("Enter strength (positive integer): "));
      const attack = Number(prompt("Enter attack (positive integer): "));
      magical_arena.addNewPlayer(name ?? "Player", health, strength, attack);
    } else if (option === 2) {
      if (magical_arena.getTotalPlayers() < 2) {
        console.log(
          "There should be atleast two players in the Arena. Please add more players.\n"
        );
      } else {
        console.log("\n");
        const first_player_id = Number(
          prompt("Enter first player id (positive integer): ")
        );
        const second_player_id = Number(
          prompt("Enter second player id (positive integer): ")
        );
        magical_arena.play(first_player_id, second_player_id);
      }
    } else {
      console.log("Exit...\n\n");
      break;
    }
  }
}

execute_magical_arena();
