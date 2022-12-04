import { readLines } from '../../read-lines';

type TopThree = {
  1: number;
  2: number;
  3: number;
};

export async function getTopThreeElvesByCalories(): Promise<TopThree> {
  let totalCalories = 0;
  const elvesByCalories: number[] = [];

  const callback = (line: string) => {
    if (line !== '') {
      totalCalories += Number(line);
    } else {
      elvesByCalories.push(totalCalories);
      totalCalories = 0;
    }
  };

  await readLines({ callback, day: '1' });

  elvesByCalories.sort((a, b) => b - a);

  return {
    1: elvesByCalories[0],
    2: elvesByCalories[1],
    3: elvesByCalories[2],
  };
}
