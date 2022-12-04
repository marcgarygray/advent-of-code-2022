#!/usr/bin/env node
import chalk from 'chalk';

import { getTopThreeElvesByCalories } from './days/1/solution';
import { getScores } from './days/2/solution';
import { getPrioritySums } from './days/3/solution';
import { getFullyOverlappedPairCount } from './days/4/solution';

(async () => {
  console.log(chalk.magenta.bold.underline('\nAdvent of Code 2022'));

  // day one
  const topThreeElves = await getTopThreeElvesByCalories();

  console.log(
    `\n ${chalk.magenta.underline('Day One Answers:')}\n  ${chalk.greenBright(
      '>'
    )} ${chalk.magenta(`Total Calories for Top Elf: `)}${chalk.bgMagenta.white(
      `${topThreeElves[1]}`
    )}\n  ${chalk.greenBright('>')} ${chalk.magenta(
      `Total Calories for Top Three Elves: `
    )}${chalk.bgMagenta.white(
      `${topThreeElves[1] + topThreeElves[2] + topThreeElves[3]}`
    )}`
  );

  // day two
  const { correctScore, incorrectScore } = await getScores();

  console.log(
    `\n ${chalk.magenta.underline('Day Two Answers:')}\n  ${chalk.greenBright(
      '>'
    )} ${chalk.magenta(`Incorrect Total Score: `)}${chalk.bgMagenta.white(
      `${incorrectScore}`
    )}\n  ${chalk.greenBright('>')} ${chalk.magenta(
      `Correct Total Score After Getting More Elf Intelligence: `
    )}${chalk.bgMagenta.white(`${correctScore}`)}`
  );

  // day three
  const { badgePrioritySum, duplicatePrioritySum } = await getPrioritySums();

  console.log(
    `\n ${chalk.magenta.underline('Day Three Answers:')}\n  ${chalk.greenBright(
      '>'
    )} ${chalk.magenta(
      'Sum of Duplicate Item Priorities: '
    )}${chalk.bgMagenta.white(
      `${duplicatePrioritySum}`
    )}\n  ${chalk.greenBright('>')} ${chalk.magenta(
      'Sum of Badge Priorities: '
    )}${chalk.bgMagenta.white(`${badgePrioritySum}`)}`
  );

  // day four
  const { anyOverlap, completeOverlap } = await getFullyOverlappedPairCount();

  console.log(
    `\n ${chalk.magenta.underline('Day Four Answers:')}\n  ${chalk.greenBright(
      '>'
    )} ${chalk.magenta(
      'Assignment pairs with complete overlap: '
    )}${chalk.bgMagenta.white(`${completeOverlap}`)}\n  ${chalk.greenBright(
      '>'
    )} ${chalk.magenta(
      'Assignment pairs with any overlap: '
    )}${chalk.bgMagenta.white(`${anyOverlap}`)}`
  );

  // day five
  const partOneAnswer = 'part one answer';
  const partTwoAnswer = 'part two answer';

  console.log(
    `\n${chalk.magenta.underline('Day Five Answers:')}\n  ${chalk.greenBright(
      '>'
    )} ${chalk.magenta('Part One: ')}${chalk.bgMagenta.white(
      `${partOneAnswer}`
    )}\n  ${chalk.greenBright('>')} ${chalk.magenta(
      'Part Two: '
    )}${chalk.bgMagenta.white(`${partTwoAnswer}`)}`
  );
})();
