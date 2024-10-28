"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

let amount = 0;
const incAmount = () => amount = amount + 1;

Object.defineProperty(exports, "amount", { get: function () { return amount; }, enumerable: !1 });
exports.incAmount = incAmount;
