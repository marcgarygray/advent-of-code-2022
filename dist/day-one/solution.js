"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayOneAnswer = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const events_1 = __importDefault(require("events"));
const readline_1 = __importDefault(require("readline"));
async function getDayOneAnswer() {
    const lineReader = readline_1.default.createInterface({
        input: fs_1.default.createReadStream(path_1.default.join(__dirname, 'inputs.txt'), 'utf-8'),
    });
    let workingSum = 0;
    let max = 0;
    lineReader.on('line', (line) => {
        if (line !== '') {
            workingSum += Number(line);
        }
        else {
            if (workingSum > max) {
                max = workingSum;
            }
            workingSum = 0;
        }
    });
    await events_1.default.once(lineReader, 'close');
    return max;
}
exports.getDayOneAnswer = getDayOneAnswer;
