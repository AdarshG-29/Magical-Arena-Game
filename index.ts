import { Arena } from "./entities/Arena";
import {
  exitMessage,
  showMenuItems,
  showNotEnoughPlayerMessage,
} from "./utils/consoleUtil";
import {
  getMenuInput,
  getPlayerDetailInput,
  getPlayerIds,
} from "./utils/helper";

const magical_arena = new Arena();

function execute_magical_arena() {
  while (1) {
    magical_arena.showPlayers();
    showMenuItems();
    const option = getMenuInput();

    if (option === 1) {
      const { name, health, strength, attack } = getPlayerDetailInput();
      magical_arena.addNewPlayer(name, health, strength, attack);
    } else if (option === 2) {
      if (magical_arena.getPlayersCount() < 2) {
        showNotEnoughPlayerMessage();
      } else {
        const { id1, id2 } = getPlayerIds();
        magical_arena.play(id1, id2);
      }
    } else {
      exitMessage();
      break;
    }
  }
}

execute_magical_arena();
