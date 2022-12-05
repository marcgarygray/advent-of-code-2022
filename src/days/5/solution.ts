import { readLines } from '../../read-lines';

type UseCrateMoverArg = {
  destinationStackNumber: number;
  numberToMove: number;
  originStackNumber: number;
  stacks: string[];
};

function useCrateMover9000({
  destinationStackNumber,
  numberToMove,
  originStackNumber,
  stacks,
}: UseCrateMoverArg): string[] {
  let originStack = stacks[originStackNumber];
  let destinationStack = stacks[destinationStackNumber];

  for (let i = numberToMove; i > 0; i--) {
    const crateToMove = originStack[originStack.length - 1];
    originStack = originStack.slice(0, -1);
    destinationStack = destinationStack + crateToMove;
  }

  stacks[originStackNumber] = originStack;
  stacks[destinationStackNumber] = destinationStack;

  return stacks;
}

function useCrateMover9001({
  destinationStackNumber,
  numberToMove,
  originStackNumber,
  stacks,
}: UseCrateMoverArg): string[] {
  let originStack = stacks[originStackNumber];
  let destinationStack = stacks[destinationStackNumber];

  const cratesToMove = originStack.slice(originStack.length - numberToMove);

  originStack = originStack.slice(0, numberToMove * -1);
  destinationStack = destinationStack + cratesToMove;

  stacks[originStackNumber] = originStack;
  stacks[destinationStackNumber] = destinationStack;

  return stacks;
}

type TopCrates = {
  withCrateMover9000: string;
  withCrateMover9001: string;
};

export async function getTopCrates(): Promise<TopCrates> {
  let stacksForCrateMover9000: string[] = [
    'NSDCVQT',
    'MFV',
    'FQWDPNHM',
    'DQRTF',
    'RFMNQHVB',
    'CFGNPWQ',
    'WFRLCT',
    'TZNS',
    'MSDJRQHN',
  ];
  let stacksForCrateMover9001 = [...stacksForCrateMover9000];

  const callback = (line: string) => {
    if (line[0] !== 'm') return;

    const words = line.split(' ');
    const numberToMove = Number(words[1]);
    const originStackNumber = Number(words[3]) - 1;
    const destinationStackNumber = Number(words[5]) - 1;

    stacksForCrateMover9000 = useCrateMover9000({
      destinationStackNumber,
      numberToMove,
      originStackNumber,
      stacks: stacksForCrateMover9000,
    });

    stacksForCrateMover9001 = useCrateMover9001({
      destinationStackNumber,
      numberToMove,
      originStackNumber,
      stacks: stacksForCrateMover9001,
    });
  };

  await readLines({ callback, day: '5' });

  return {
    withCrateMover9000: stacksForCrateMover9000.reduce(
      (tops, current) => tops + current[current.length - 1],
      ''
    ),
    withCrateMover9001: stacksForCrateMover9001.reduce(
      (tops, current) => tops + current[current.length - 1],
      ''
    ),
  };
}
