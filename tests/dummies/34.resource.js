#!/usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const { readFileSync } = require('node:fs');
const compile = require('require-from-string');

let amount = 0;
const incAmount = () => amount = amount + 1;

const internalFn = typeof readFileSync;
const externalFn = typeof compile;

Object.defineProperty(exports, 'amount', { get () { return amount }, enumerable: true });
exports.incAmount = incAmount;
exports.internalFn = internalFn;
exports.externalFn = externalFn;
