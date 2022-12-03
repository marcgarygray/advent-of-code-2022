import fs from 'fs';
import path from 'path';
import events from 'events';
import readline from 'readline';

/*
 * A: Rock
 * B: Paper
 * C: Scissors
 */
type OpponentThrow = 'A' | 'B' | 'C';

/**
 * X: Rock
 * Y: Paper
 * Z: Scissors
 */
type YourThrow = 'X' | 'Y' | 'Z';

const throwPoints: Record<YourThrow, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

function rockPaperScissors({
  you,
  opponent,
}: {
  you: YourThrow;
  opponent: OpponentThrow;
}): number {
  let roundScore = throwPoints[you];
  switch (you) {
    case 'X':
      switch (opponent) {
        case 'A':
          return (roundScore += 3);
        case 'B':
          return roundScore;
        case 'C':
          return (roundScore += 6);
      }
    case 'Y':
      switch (opponent) {
        case 'A':
          return (roundScore += 6);
        case 'B':
          return (roundScore += 3);
        case 'C':
          return roundScore;
      }
    case 'Z':
      switch (opponent) {
        case 'A':
          return roundScore;
        case 'B':
          return (roundScore += 6);
        case 'C':
          return (roundScore += 3);
      }
  }
}

export async function getTotalScore(): Promise<number> {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(
      path.join(__dirname, '..', '..', 'src', 'day-two', 'inputs.txt'),
      'utf-8'
    ),
  });

  let totalScore = 0;
  lineReader.on('line', (line) => {
    const round = line.split(' ');
    const opponent = round[0] as OpponentThrow;
    const you = round[1] as YourThrow;
    totalScore += rockPaperScissors({
      opponent,
      you,
    });
  });

  await events.once(lineReader, 'close');

  return totalScore;
}

// part two

type DesiredOutcome = 'lose' | 'draw' | 'win';

function decodeDesiredOutcome({
  encoded,
}: {
  encoded: YourThrow;
}): DesiredOutcome {
  switch (encoded) {
    case 'X':
      return 'lose';
    case 'Y':
      return 'draw';
    case 'Z':
      return 'win';
  }
}

function getThrowForDesiredOutcome({
  opponent,
  outcome,
}: {
  opponent: OpponentThrow;
  outcome: DesiredOutcome;
}): YourThrow {
  switch (opponent) {
    case 'A':
      switch (outcome) {
        case 'lose':
          return 'Z';
        case 'win':
          return 'Y';
        case 'draw':
          return 'X';
      }
    case 'B':
      switch (outcome) {
        case 'lose':
          return 'X';
        case 'win':
          return 'Z';
        case 'draw':
          return 'Y';
      }
    case 'C':
      switch (outcome) {
        case 'lose':
          return 'Y';
        case 'win':
          return 'X';
        case 'draw':
          return 'Z';
      }
  }
}

export async function getTotalScorePartTwo(): Promise<number> {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(
      path.join(__dirname, '..', '..', 'src', 'day-two', 'inputs.txt'),
      'utf-8'
    ),
  });

  let totalScore = 0;
  lineReader.on('line', (line) => {
    const round = line.split(' ');
    const opponent = round[0] as OpponentThrow;
    const encoded = round[1] as YourThrow;
    const outcome = decodeDesiredOutcome({ encoded });
    const you = getThrowForDesiredOutcome({ opponent, outcome });
    totalScore += rockPaperScissors({ opponent, you });
  });

  await events.once(lineReader, 'close');

  return totalScore;
}
