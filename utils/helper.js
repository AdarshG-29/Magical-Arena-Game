"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inValidAttribute = inValidAttribute;
exports.rollDice = rollDice;
function inValidAttribute(attribute) {
    return !Number.isInteger(attribute) || attribute <= 0;
}
function rollDice() {
    var minValue = 1, maxValue = 6;
    return minValue + Math.floor(Math.random() * (maxValue - minValue + 1));
}
