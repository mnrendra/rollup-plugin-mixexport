"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let amount = 0;
const incAmount = () => amount = amount + 1;
Object.defineProperty(exports, "amount", {
  value: amount,
  writable: false,
  abc: 123
});
exports.incAmount = incAmount;
module.exports = {};
exports.default = module.exports;
Object.defineProperties(module.exports, { __esModule: { value: exports.__esModule }, amount: { value: exports.amount, writable: false, abc: 123, enumerable: true }, incAmount: { value: exports.incAmount, enumerable: true }, default: { value: exports.default } });
