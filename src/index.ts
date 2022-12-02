#!/usr/bin/env node
import chalk from 'chalk';
import { getDayOneAnswer } from './day-one/solution';

(async () => {
  const dayOneAnswer = await getDayOneAnswer();
  console.log(`
    ${chalk.magenta('Day One Answer:')}
    ${chalk.bgMagenta.white(`       `)}
    ${chalk.bgMagenta.white(` ${dayOneAnswer} `)}
    ${chalk.bgMagenta.white(`       `)}
  `);
})();
