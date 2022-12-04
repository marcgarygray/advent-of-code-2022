#!/usr/bin/env node

import chalk from 'chalk';
import { getTopThreeElvesByCalories } from './day-one/solution';
import { getScores } from './day-two/solution';
import { getTotalPriority, getBadgePriorityTotal } from './day-three/solution';
import { getFullyOverlappedPairCount } from './day-four/solution';

(async () => {
  // day one
  const topThreeElves = await getTopThreeElvesByCalories();

  console.log(
    `\n${chalk.magenta('Day One Answers:')}\n ${chalk.magenta(
      `Total Calories for Top Elf: `
    )}${chalk.bgMagenta.white(`${topThreeElves[1]}`)}\n ${chalk.magenta(
      `Total Calories for Top Three Elves: `
    )}${chalk.bgMagenta.white(
      `${topThreeElves[1] + topThreeElves[2] + topThreeElves[3]}`
    )}`
  );

  // day two
  const { correctScore, incorrectScore } = await getScores();

  console.log(
    `\n${chalk.magenta('Day Two Answers:')}\n ${chalk.magenta(
      `Incorrect Total Score: `
    )}${chalk.bgMagenta.white(`${incorrectScore}`)}\n ${chalk.magenta(
      `Correct Total Score After Getting More Elf Intelligence: `
    )}${chalk.bgMagenta.white(`${correctScore}`)}`
  );

  // day three
  const totalPriority = await getTotalPriority();
  const badgePriorityTotal = await getBadgePriorityTotal();

  console.log(
    `\n${chalk.magenta('Day Three Answers:')}\n ${chalk.magenta(
      'Total Priority: '
    )}${chalk.bgMagenta.white(`${totalPriority}`)}\n ${chalk.magenta(
      'Total Badge Priority: '
    )}${chalk.bgMagenta.white(`${badgePriorityTotal}`)}`
  );

  // day four
  const { completeOverlap, anyOverlap } = await getFullyOverlappedPairCount();
  console.log(completeOverlap);
  console.log(anyOverlap);
})();
