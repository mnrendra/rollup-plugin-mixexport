"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

let amount = 0;
const incAmount = () => amount = amount + 1;

const key = "amount";
Object.defineProperty(exports, key, { get () { return amount; } });
exports.incAmount = incAmount;
