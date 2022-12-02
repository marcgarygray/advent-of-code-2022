#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const solution_1 = require("./day-one/solution");
(async () => {
    const dayOneAnswer = await (0, solution_1.getDayOneAnswer)();
    console.log(`
    ${chalk_1.default.magenta('Day One Answer:')}
    ${chalk_1.default.bgMagenta.white(`       `)}
    ${chalk_1.default.bgMagenta.white(` ${dayOneAnswer} `)}
    ${chalk_1.default.bgMagenta.white(`       `)}
  `);
})();
