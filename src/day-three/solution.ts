import fs from 'fs';
import path from 'path';
import events from 'events';
import readline from 'readline';

function getPriority({ item }: { item: string }): number {
  const charCode = item.charCodeAt(0);
  // lowercase
  if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  }
  // uppercase
  if (charCode >= 65 && charCode <= 90) {
    return charCode - 38;
  }
  return 0;
}

export async function getTotalPriority(): Promise<number> {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(
      path.join(__dirname, '..', '..', 'src', 'day-three', 'inputs.txt'),
      'utf-8'
    ),
  });

  let totalPriority = 0;
  lineReader.on('line', (line) => {
    const compartmentOne = line.slice(0, line.length / 2);
    const compartmentTwo = line.slice(line.length / 2);
    const compartmentOneItems = compartmentOne.split('');
    const compartmentTwoItems = compartmentTwo.split('');
    let duplicateItem = '';
    for (let i = 0; i < compartmentOneItems.length; i++) {
      if (compartmentTwoItems.some((item) => item === compartmentOneItems[i])) {
        duplicateItem = compartmentOneItems[i];
        break;
      }
    }
    totalPriority += getPriority({ item: duplicateItem });
  });

  await events.once(lineReader, 'close');

  return totalPriority;
}

// part two

export async function getBadgePriorityTotal(): Promise<number> {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(
      path.join(__dirname, '..', '..', 'src', 'day-three', 'inputs.txt'),
      'utf-8'
    ),
  });

  const elfGroups: string[][] = [];
  lineReader.on('line', (line) => {
    const lastGroup = elfGroups[elfGroups.length - 1];
    if (lastGroup === undefined || lastGroup.length === 3) {
      elfGroups.push([line]);
    } else {
      elfGroups[elfGroups.length - 1] = lastGroup
        ? [...lastGroup, line]
        : [line];
    }
  });

  await events.once(lineReader, 'close');

  let totalPriority = 0;

  elfGroups.forEach((group) => {
    const ruckOne = group[0];
    const ruckOneItems = ruckOne.split('');
    const ruckTwo = group[1];
    const ruckTwoItems = ruckTwo.split('');
    const ruckThree = group[2];
    const ruckThreeItems = ruckThree.split('');
    let duplicateItem = '';
    for (let i = 0; i < ruckOneItems.length; i++) {
      if (
        ruckTwoItems.some((item) => item === ruckOneItems[i]) &&
        ruckThreeItems.some((item) => item === ruckOneItems[i])
      ) {
        duplicateItem = ruckOneItems[i];
        break;
      }
    }
    totalPriority += getPriority({ item: duplicateItem });
  });

  return totalPriority;
}
