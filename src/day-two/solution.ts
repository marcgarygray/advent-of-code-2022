import fs from 'fs';
import path from 'path';
import events from 'events';
import readline from 'readline';

/*
 * A: Rock
 * B: Paper
 * C: Scissors
 *
 */
type OpponentThrow = 'A' | 'B' | 'C';

/**
 * X: Rock
 * Y: Paper
 * Z: Scissors
 *
 */
type YourThrow = 'X' | 'Y' | 'Z';

const throwPoints: Record<YourThrow, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

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
    const opponentThrow = round[0] as OpponentThrow;
    const yourThrow = round[1] as YourThrow;
    let roundScore = throwPoints[yourThrow];
    switch (yourThrow) {
      case 'X':
        if (opponentThrow === 'A') {
          roundScore += 3;
        }
        if (opponentThrow === 'B') {
          // loss - no points
        }
        if (opponentThrow === 'C') {
          roundScore += 6;
        }
        break;
      case 'Y':
        if (opponentThrow === 'A') {
          roundScore += 6;
        }
        if (opponentThrow === 'B') {
          roundScore += 3;
        }
        if (opponentThrow === 'C') {
          // loss - no points
        }
        break;
      case 'Z':
        if (opponentThrow === 'A') {
          // loss - no points
        }
        if (opponentThrow === 'B') {
          roundScore += 6;
        }
        if (opponentThrow === 'C') {
          roundScore += 3;
        }
    }
    totalScore += roundScore;
  });

  await events.once(lineReader, 'close');

  return totalScore;
}
