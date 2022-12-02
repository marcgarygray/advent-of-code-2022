import fs from 'fs';
import path from 'path';
import events from 'events';
import readline from 'readline';

export async function getDayOneAnswer(): Promise<number> {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(
      path.join(__dirname, '..', '..', 'src', 'day-one', 'inputs.txt'),
      'utf-8'
    ),
  });

  let workingSum = 0;
  let max = 0;

  lineReader.on('line', (line) => {
    if (line !== '') {
      workingSum += Number(line);
    } else {
      if (workingSum > max) {
        max = workingSum;
      }
      workingSum = 0;
    }
  });

  await events.once(lineReader, 'close');

  return max;
}
