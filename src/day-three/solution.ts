import { readLines } from '../read-lines';

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

type PrioritySums = {
  badgePrioritySum: number;
  duplicatePrioritySum: number;
};

export async function getPrioritySums(): Promise<PrioritySums> {
  // part one
  let duplicatePrioritySum = 0;

  // part two
  let badgePrioritySum = 0;
  const elfGroups: string[][] = [];

  const callback = (line: string) => {
    // part one
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
    duplicatePrioritySum += getPriority({ item: duplicateItem });

    // part two
    const lastGroup = elfGroups[elfGroups.length - 1];
    if (lastGroup === undefined || lastGroup.length === 3) {
      elfGroups.push([line]);
    } else {
      elfGroups[elfGroups.length - 1] = [...lastGroup, line];
    }
  };

  await readLines({ callback, day: 'three' });

  // part two
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
    badgePrioritySum += getPriority({ item: duplicateItem });
  });

  return { badgePrioritySum, duplicatePrioritySum };
}
