"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let amount = 0;
const incAmount = () => amount = amount + 1;
Object.defineProperty(exports, "amount", {
  get() {
    return amount;
  }
});
exports.incAmount = incAmount;
if (process.env.NODE_ENV === "production") {
  exports.default = () => "production";
} else {
  exports.default = () => "development";
}
module.exports = exports.default;
Object.defineProperties(module.exports, { __esModule: { value: false }, amount: { get: function() {
  return amount;
} }, incAmount: { value: exports.incAmount }, default: { value: exports.default } });
