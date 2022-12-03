#!/usr/bin/env node
import chalk from 'chalk';
import { getTopThreeElves } from './day-one/solution';
import { getTotalScore } from './day-two/solution';

(async () => {
  const topThreeElves = await getTopThreeElves();
  console.log(`
    ${chalk.magenta('Day One Answers:')}
    ${chalk.magenta(` Top Elf:`)}
     ${chalk.bgMagenta.white(`        `)}
     ${chalk.bgMagenta.white(` ${topThreeElves[1]}  `)}
     ${chalk.bgMagenta.white(`        `)}
    ${chalk.magenta(` Top Three Elves:`)}
     ${chalk.bgMagenta.white(`        `)}
     ${chalk.bgMagenta.white(
       ` ${topThreeElves[1] + topThreeElves[2] + topThreeElves[3]} `
     )}
     ${chalk.bgMagenta.white(`        `)}
  `);
})();

(async () => {
  const totalScore = await getTotalScore();
  console.log(`
    ${chalk.magenta('Day Two Answers:')}
    ${chalk.magenta(` Total Score:`)}
     ${chalk.bgMagenta.white(`        `)}
     ${chalk.bgMagenta.white(` ${totalScore}  `)}
     ${chalk.bgMagenta.white(`        `)}
  `);
})();
