"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

let amount = 0;
const incAmount = () => amount = amount + 1;

Object.defineProperties(exports, {
  amount: { get () { return amount; } }
});
exports.incAmount = incAmount;
