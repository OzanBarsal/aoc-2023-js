import fs from "fs";
const input = fs.readFileSync("./day5.dat", "utf8");

const blocks = input.split("\n\n").map((block) => block.split("\n"));

const seeds = blocks
  .reverse()
  .pop()[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((seed) => parseInt(seed, 10));

const maps = blocks.reverse().map((map) => {
  const name = map.reverse().pop();
  const type = name.split("-")[0];
  const convertsTo = name.split("-")[2].split(" ")[0];

  const rules = map.reverse().map((rule) => {
    const numbers = rule.split(" ");
    const from = parseInt(numbers[1], 10);
    const diff = parseInt(numbers[0], 10) - from;
    const to = from + parseInt(numbers[2], 10) - 1;
    return { diff, from, to };
  });

  return { type, rules, convertsTo };
});

const convert = (number, targetType, type = "seed") => {
  let currentType = type;
  let currentNumber = number;
  while (currentType !== targetType) {
    const map = maps.find((map) => map.type === currentType);
    const rule = map.rules.find(
      ({ from, to }) => currentNumber >= from && currentNumber <= to
    );

    if (rule) {
      currentNumber += rule.diff;
    }

    currentType = map.convertsTo;
  }
  return currentNumber;
};

const partOneResult = Math.min(
  ...seeds.map((seed) => convert(seed, "location"))
);

console.log(`Part 1 result: ${partOneResult}`);

const parseSeeds = (seeds = []) => {
  const seedRanges = [];
  seeds.forEach((seed, index) => {
    if (index % 2 === 0) {
      seedRanges.push({ start: seed, end: seed });
    } else {
      seedRanges[Math.floor(index / 2)].end += seed - 1;
    }
  });
  return seedRanges;
};

const partTwoResult = () => {
  const ranges = parseSeeds(seeds);

  const minsInRanges = ranges.map(({ start, end }) => {
    let current = start;
    let smallestLocation = convert(current, "location");
    console.log("Im alive"); // Necessary optimization.
    while (current <= end) {
      const currentLocation = convert(current, "location");

      smallestLocation = Math.min(currentLocation, smallestLocation);
      current += 1;
    }

    return smallestLocation;
  });

  return Math.min(...minsInRanges);
};

console.log(`Part 2 result: ${partTwoResult()}`);
