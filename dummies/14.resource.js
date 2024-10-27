"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

let amount = 0;
const incAmount = () => amount = amount + 1;

Object.defineProperty(exports, "amount", { value: amount, set: function (v) { amount = v; } });
exports.incAmount = incAmount;
