"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Arena_1 = require("./entities/Arena");
var prompt_sync_1 = require("prompt-sync");
var prompt = (0, prompt_sync_1.default)();
var magical_arena = new Arena_1.Arena();
function execute_magical_arena() {
    while (1) {
        magical_arena.showPlayers();
        console.log("Options: \n\t1. Add new player\n\t2. Start playing\n\t3. Exit\n");
        var option = Number(prompt("Enter your choice: "));
        if (option === 1) {
            var name_1 = prompt("Enter Name: ");
            var health = Number(prompt("Enter health (positive integer): "));
            var strength = Number(prompt("Enter health (positive integer): "));
            var attack = Number(prompt("Enter health (positive integer): "));
            magical_arena.addNewPlayer(name_1 !== null && name_1 !== void 0 ? name_1 : "Player", health, strength, attack);
        }
        else if (option === 2) {
            if (magical_arena.getTotalPlayers() < 2) {
                console.log("There should be atleast two players in the Arena. Please add more players.\n");
            }
            else {
                var first_player_id = Number(prompt("Enter first player id (positive integer): "));
                var second_player_id = Number(prompt("Enter second player id (positive integer): "));
                magical_arena.play(first_player_id, second_player_id);
            }
        }
        else {
            console.log("Exit...\n\n");
            break;
        }
    }
}
execute_magical_arena();
