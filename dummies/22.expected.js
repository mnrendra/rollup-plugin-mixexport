"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let amount = 0;
const incAmount = () => amount = amount + 1;
Object.defineProperty(exports, "amount", {
  get: function() {
    return amount;
  }
});
exports.incAmount = incAmount;
module.exports = {};
exports.default = module.exports;
Object.defineProperties(module.exports, { __esModule: { value: exports.__esModule }, amount: { get: function() {
  return amount;
}, enumerable: true }, incAmount: { value: exports.incAmount, enumerable: true }, default: { value: exports.default } });
