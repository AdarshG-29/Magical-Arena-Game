"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
//defining Player class entity
var Player = /** @class */ (function () {
    function Player(playerId, name, health, strength, attack) {
        this.playerId = playerId;
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }
    return Player;
}());
exports.Player = Player;
