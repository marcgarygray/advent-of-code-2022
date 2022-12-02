import fs from "fs";
import path from "path";
import events from "events";
import readline from "readline";

type TopThree = {
  1: number;
  2: number;
  3: number;
};

export async function getTopThreeElves(): Promise<TopThree> {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(
      path.join(__dirname, "..", "..", "src", "day-one", "inputs.txt"),
      "utf-8"
    ),
  });

  let workingSum = 0;
  const elves: number[] = [];
  lineReader.on("line", (line) => {
    if (line !== "") {
      workingSum += Number(line);
    } else {
      elves.push(workingSum);
      workingSum = 0;
    }
  });

  await events.once(lineReader, "close");

  elves.sort((a, b) => b - a);

  return { 1: elves[0], 2: elves[1], 3: elves[2] };
}
