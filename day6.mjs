import fs from "fs";
const input = fs.readFileSync("./day6.dat", "utf8");

const getNumber = (str) =>
  parseInt(
    str.substring(0, str.indexOf(" ") > -1 ? str.indexOf(" ") : str.length),
    10
  );

const trimNumber = (str) =>
  str.indexOf(" ") > -1 ? str.substring(str.indexOf(" "), str.length) : "";

const parseInput = () => {
  let times = input.split("\n")[0].split(":")[1];
  let distances = input.split("\n")[1].split(":")[1];

  const data = [];

  while (/\d/.test(times)) {
    times = times.trim();
    distances = distances.trim();

    data.push({
      time: getNumber(times),
      distance: getNumber(distances),
    });

    times = trimNumber(times);
    distances = trimNumber(distances);
  }

  return data;
};

const data = parseInput();

const findPossibleRecords = ({ time, distance }) => {
  let smallestWinningCharge = 0;

  while (smallestWinningCharge * (time - smallestWinningCharge) <= distance) {
    smallestWinningCharge++;
  }

  return time - (smallestWinningCharge * 2 - 1);
};

const partOneResult = data
  .map((race) => findPossibleRecords(race))
  .reduce((p, c) => p * c, 1);

console.log(`Part 1 result: ${partOneResult}`);

const parseAsSingleRace = (input) => {
  let time = parseInt(
    input
      .split("\n")[0]
      .split(":")[1]
      .split("")
      .filter((str) => /\d/.test(str))
      .join(""),
    10
  );
  let distance = parseInt(
    input
      .split("\n")[1]
      .split(":")[1]
      .split("")
      .filter((str) => /\d/.test(str))
      .join(""),
    10
  );

  return { time, distance };
};

const partTwoResult = findPossibleRecords(parseAsSingleRace(input));

console.log(`Part 2 result: ${partTwoResult}`);
