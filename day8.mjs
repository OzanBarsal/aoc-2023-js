import fs from "fs";
const input = fs.readFileSync("./day8.dat", "utf8");

const instructions = input
  .split("\n\n")[0]
  .split("")
  .map((str) => (str === "L" ? 0 : 1));

const maps = input
  .split("\n\n")[1]
  .split("\n")
  .map((str) => {
    const val = str.split(" = ")[0];
    const paths = str
      .split(" = ")[1]
      .replaceAll("(", "")
      .replaceAll(")", "")
      .split(", ");
    return { val, paths };
  })
  .reduce((p, { val, paths }) => {
    p[val] = paths;
    return p;
  }, {});

const calculatePartOne = () => {
  let steps = 0;
  let currentVal = "AAA";

  while (currentVal !== "ZZZ") {
    currentVal = maps[currentVal][instructions[steps % instructions.length]];
    steps++;
  }

  return steps;
};

console.log(`Part 1 result: ${calculatePartOne()}`);

const calculateNode = (start) => {
  let steps = 0;
  let currentVal = start;

  while (currentVal.charAt(2) !== "Z") {
    currentVal = maps[currentVal][instructions[steps % instructions.length]];
    steps++;
  }

  return steps;
};

let nodes = Object.keys(maps).filter((val) => val.charAt(2) === "A");

const nodeSteps = nodes.map((val) => calculateNode(val));

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

console.log(`Part 2 result: ${nodeSteps.reduce(lcm)}`);
