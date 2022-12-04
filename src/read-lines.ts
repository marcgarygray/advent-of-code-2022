import fs from 'fs';
import path from 'path';
import events from 'events';
import readline from 'readline';

type LineReaderCallback = (line: string) => void;

type ReadlinesArg = {
  callback: LineReaderCallback;
  day: string;
};

export async function readLines({
  callback,
  day,
}: ReadlinesArg): Promise<void> {
  const filePath = path.join(__dirname, '..', 'src', `days`, day, 'input.txt');
  const lineReader = readline.createInterface({
    input: fs.createReadStream(filePath, 'utf-8'),
  });

  lineReader.on('line', callback);

  await events.once(lineReader, 'close');
}
