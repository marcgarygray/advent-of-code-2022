import { readLines } from '../../read-lines';

type OverlapCounts = {
  anyOverlap: number;
  completeOverlap: number;
};

export async function getFullyOverlappedPairCount(): Promise<OverlapCounts> {
  let anyOverlap = 0;
  let completeOverlap = 0;

  const callback = (line: string) => {
    const assignments = line.split(',');

    const assignmentOne = assignments[0];
    const assignmentTwo = assignments[1];

    const asgmtOneSections = assignmentOne.split('-');
    const asgmtTwoSections = assignmentTwo.split('-');

    const a1s1 = Number(asgmtOneSections[0]);
    const a1s2 = Number(asgmtOneSections[1]);
    const a2s1 = Number(asgmtTwoSections[0]);
    const a2s2 = Number(asgmtTwoSections[1]);

    // part one
    if ((a1s1 >= a2s1 && a1s2 <= a2s2) || (a2s1 >= a1s1 && a2s2 <= a1s2)) {
      completeOverlap += 1;
    }

    // part two
    if (
      (a1s1 >= a2s1 && a1s1 <= a2s2) ||
      (a1s2 >= a2s1 && a1s2 <= a2s2) ||
      (a2s1 >= a1s1 && a2s1 <= a1s2) ||
      (a2s2 >= a1s1 && a2s2 <= a1s2)
    ) {
      anyOverlap += 1;
    }
  };

  await readLines({ callback, day: '4' });

  return { anyOverlap, completeOverlap };
}
