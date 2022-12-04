import { readLines } from '../read-lines';

export async function getFullyOverlappedPairCount(): Promise<{
  completeOverlap: number;
  anyOverlap: number;
}> {
  let totalOverlap = 0;
  let anyOverlap = 0;
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
    if ((a1s1 >= a2s1 && a1s2 <= a2s2) || (a2s1 >= a1s1 && a2s2 <= a1s2)) {
      totalOverlap += 1;
    }
    if (
      (a1s1 >= a2s1 && a1s1 <= a2s2) ||
      (a1s2 >= a2s1 && a1s2 <= a2s2) ||
      (a2s1 >= a1s1 && a2s1 <= a1s2) ||
      (a2s2 >= a1s1 && a2s2 <= a1s2)
    ) {
      anyOverlap += 1;
    }
  };

  await readLines({ callback, day: 'four' });

  return { completeOverlap: totalOverlap, anyOverlap };
}
