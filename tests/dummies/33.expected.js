"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { readFileSync } = require("node:fs");
const compile = require("require-from-string");
let amount = 0;
const incAmount = () => amount = amount + 1;
const internalFn = typeof readFileSync;
const externalFn = typeof compile;
Object.defineProperty(exports, "amount", {
  get() {
    return amount;
  }
});
exports.incAmount = incAmount;
exports.internalFn = internalFn;
exports.externalFn = externalFn;
module.exports = {};
exports.default = module.exports;
Object.defineProperties(module.exports, { __esModule: { value: exports.__esModule }, amount: { get: function() {
  return amount;
}, enumerable: true }, incAmount: { value: exports.incAmount, enumerable: true }, internalFn: { value: exports.internalFn, enumerable: true }, externalFn: { value: exports.externalFn, enumerable: true }, default: { value: exports.default } });
