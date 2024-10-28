"use strict";

let amount = 0;
const incAmount = () => amount = amount + 1;

Object.defineProperty(exports, "amount", { get () { return amount; } });
exports.incAmount = incAmount;
