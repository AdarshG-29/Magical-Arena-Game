"use strict";
//defining arena class entity and all the required methods.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arena = void 0;
var helper_1 = require("../utils/helper");
var Player_1 = require("./Player");
var Arena = /** @class */ (function () {
    function Arena() {
        this.total_players = 0;
        this.Players = new Map();
        console.log("\nWelcome to the magical arena!!\n");
    }
    Arena.prototype.hasPlayer = function (playerId) {
        return this.Players.has(playerId);
    };
    Arena.prototype.getTotalPlayers = function () {
        return this.Players.size;
    };
    Arena.prototype.addNewPlayer = function (name, health, strength, attack) {
        //displaying invalid input messages
        if ((0, helper_1.inValidAttribute)(health)) {
            console.log("Invalid input!! Health should be a positive integer\n");
            return -1;
        }
        if ((0, helper_1.inValidAttribute)(strength)) {
            console.log("Invalid input!! Strength should be a positive integer\n");
            return -1;
        }
        if ((0, helper_1.inValidAttribute)(attack)) {
            console.log("Invalid input!! Attack should be a positive integer\n");
            return -1;
        }
        var playerId = this.total_players;
        var newPlayer = new Player_1.Player(playerId, name, health, strength, attack);
        this.Players.set(playerId, newPlayer);
        this.total_players += 1;
        return playerId;
    };
    //eliminate or delete player from Players map
    Arena.prototype.eliminatePlayer = function (id) {
        if (this.Players.has(id)) {
            var player = this.Players.get(id);
            console.log("".concat(player === null || player === void 0 ? void 0 : player.name, " is eliminated\n"));
            this.Players.delete(id);
        }
        else
            console.log("No player with id = ".concat(id, " exists.\n"));
    };
    Arena.prototype.showPlayers = function () {
        console.log("\ntotal players are: ".concat(this.getTotalPlayers(), "\n"));
        var i = 1;
        this.Players.forEach(function (player, id) {
            var name = player.name, health = player.health, strength = player.strength, attack = player.attack;
            console.log("Player ", i, "\n");
            console.log("\tName: ".concat(name));
            console.log("\tPlayer id: ".concat(id));
            console.log("\tHealth: ".concat(health));
            console.log("\tStrength: ".concat(strength));
            console.log("\tAttack: ".concat(attack));
            console.log("\n");
            i += 1;
        });
    };
    Arena.prototype.play = function (id_first_player, id_second_player) {
        var _a, _b;
        if (id_first_player === id_second_player) {
            console.log("Ids can not be same for both the players.\n");
            return;
        }
        var attacker = this.Players.get(id_first_player);
        var defender = this.Players.get(id_second_player);
        if (!attacker) {
            console.log("Player with id: ".concat(id_second_player, " does not exist.\n"));
            return;
        }
        if (!defender) {
            console.log("Player with id: ".concat(id_first_player, " does not exist.\n"));
            return;
        }
        //swapping attacker and defender with respect to their health. As lower health player will attack first.
        if ((defender === null || defender === void 0 ? void 0 : defender.health) < (attacker === null || attacker === void 0 ? void 0 : attacker.health)) {
            _a = [defender, attacker], attacker = _a[0], defender = _a[1];
        }
        while (defender.health > 0) {
            var attackerRolledDice = (0, helper_1.rollDice)();
            var attacking_power = attacker.attack * attackerRolledDice;
            var defenderRolledDice = (0, helper_1.rollDice)();
            var defending_power = defender.strength * defenderRolledDice;
            console.log("\n".concat(attacker.name, " rolled dice ").concat(attackerRolledDice, " and attacks with the power ").concat(attacking_power));
            console.log("".concat(defender.name, " rolled dice ").concat(defenderRolledDice, " and defends with the strength ").concat(defending_power));
            console.log("\nAfter Attack:\n");
            if (attacking_power > defending_power)
                defender.health = Math.max(0, defender.health - (attacking_power - defending_power)); //if attacking power is more than defender's strength, then we will deduct it from defender's health.
            console.log("".concat(defender.name, " has health: ").concat(defender.health, "\n"));
            if (defender.health > 0)
                _b = [defender, attacker], attacker = _b[0], defender = _b[1]; //the if condition implies that finally, the current attacker will win and the current defender will loose, and it wont swap it again after loosing the game.
        }
        console.log("".concat(attacker.name, " is winner\n"));
        this.eliminatePlayer(defender.playerId);
    };
    return Arena;
}());
exports.Arena = Arena;
