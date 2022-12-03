#!/usr/bin/env node
import chalk from 'chalk';
import { getTopThreeElves } from './day-one/solution';
import { getTotalScore, getTotalScorePartTwo } from './day-two/solution';
import { getTotalPriority, getBadgePriorityTotal } from './day-three/solution';

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
  const totalScore = await getTotalScore();
  const totalScorePartTwo = await getTotalScorePartTwo();
  console.log(`
    ${chalk.magenta('Day Two Answers:')}
    ${chalk.magenta(` Total Score:`)}
     ${chalk.bgMagenta.white(`        `)}
     ${chalk.bgMagenta.white(` ${totalScore}  `)}
     ${chalk.bgMagenta.white(`        `)}
    ${chalk.magenta(` Total Score After Getting More Elf Intelligence:`)}
     ${chalk.bgMagenta.white(`        `)}
     ${chalk.bgMagenta.white(` ${totalScorePartTwo}  `)}
     ${chalk.bgMagenta.white(`        `)}
  `);
  const totalPriotiy = await getTotalPriority();
  console.log(totalPriotiy);
  const badgePriorityTotal = await getBadgePriorityTotal();
  console.log(badgePriorityTotal);
})();
