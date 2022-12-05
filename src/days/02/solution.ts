import { readLines } from '../../read-lines';

type EncodedOpponentThrow = 'A' | 'B' | 'C';

enum OpponentThrow {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

type EncodedMyThrow = 'X' | 'Y' | 'Z';

enum MyThrow {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

const throwPoints: Record<EncodedMyThrow, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

type Outcome = 'lose' | 'draw' | 'win';

const roundScore: Record<Outcome, number> = {
  lose: 0,
  draw: 3,
  win: 6,
};

type RockPaperScissorsArg = {
  encodedMyThrow: EncodedMyThrow;
  encodedOpponentThrow: EncodedOpponentThrow;
};

function rockPaperScissors({
  encodedMyThrow,
  encodedOpponentThrow,
}: RockPaperScissorsArg): number {
  let score = throwPoints[encodedMyThrow];

  switch (encodedMyThrow) {
    case MyThrow.Rock:
      switch (encodedOpponentThrow) {
        case OpponentThrow.Rock:
          return (score += roundScore.draw);
        case OpponentThrow.Paper:
          return (score += roundScore.lose);
        case OpponentThrow.Scissors:
          return (score += roundScore.win);
      }
    case MyThrow.Paper:
      switch (encodedOpponentThrow) {
        case OpponentThrow.Rock:
          return (score += roundScore.win);
        case OpponentThrow.Paper:
          return (score += roundScore.draw);
        case OpponentThrow.Scissors:
          return (score += roundScore.lose);
      }
    case MyThrow.Scissors:
      switch (encodedOpponentThrow) {
        case OpponentThrow.Rock:
          return (score += roundScore.lose);
        case OpponentThrow.Paper:
          return (score += roundScore.win);
        case OpponentThrow.Scissors:
          return (score += roundScore.draw);
      }
  }
  return score;
}

type DecodeDesiredOutcomeArg = {
  encodedOutcome: EncodedMyThrow;
};

const desiredOutcomeDictionary: Record<EncodedMyThrow, Outcome> = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

type GetThrowForDesiredOutcomeArg = {
  desiredOutcome: Outcome;
  encodedOpponentThrow: EncodedOpponentThrow;
};

function getThrowForDesiredOutcome({
  desiredOutcome,
  encodedOpponentThrow,
}: GetThrowForDesiredOutcomeArg): EncodedMyThrow {
  switch (encodedOpponentThrow) {
    case OpponentThrow.Rock:
      switch (desiredOutcome) {
        case 'lose':
          return MyThrow.Scissors;
        case 'win':
          return MyThrow.Paper;
        case 'draw':
          return MyThrow.Rock;
      }
    case OpponentThrow.Paper:
      switch (desiredOutcome) {
        case 'lose':
          return MyThrow.Rock;
        case 'win':
          return MyThrow.Scissors;
        case 'draw':
          return MyThrow.Paper;
      }
    case OpponentThrow.Scissors:
      switch (desiredOutcome) {
        case 'lose':
          return MyThrow.Paper;
        case 'win':
          return MyThrow.Rock;
        case 'draw':
          return MyThrow.Scissors;
      }
  }
  return 'X';
}

type Scores = {
  correctScore: number;
  incorrectScore: number;
};

export async function getScores(): Promise<Scores> {
  let incorrectScore = 0;
  let correctScore = 0;

  const callback = (line: string) => {
    // part one
    const round = line.split(' ');
    const encodedOpponentThrow = round[0] as EncodedOpponentThrow;
    const encodedMyThrow = round[1] as EncodedMyThrow;
    incorrectScore += rockPaperScissors({
      encodedMyThrow,
      encodedOpponentThrow,
    });

    // part two
    const desiredOutcome = desiredOutcomeDictionary[encodedMyThrow];
    const myCorrectEncodedThrow = getThrowForDesiredOutcome({
      encodedOpponentThrow,
      desiredOutcome,
    });
    correctScore += rockPaperScissors({
      encodedMyThrow: myCorrectEncodedThrow,
      encodedOpponentThrow,
    });
  };

  await readLines({ callback, day: '02' });

  return { correctScore, incorrectScore };
}
