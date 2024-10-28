"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

let amount = 0;
const incAmount = () => amount = amount + 1;

Object.defineProperty(exports, "amount", { get () { return amount; } });
exports.incAmount = incAmount;
