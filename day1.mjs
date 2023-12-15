import fs from "fs";
const input = fs.readFileSync("./day1.dat", "utf8");

const partOneResult = input
  .replace(/[^\d/\n]/g, "")
  .split("\n")
  .map((digits) =>
    parseInt(`${digits.charAt(0)}${digits.charAt(digits.length - 1)}`, 10)
  )
  .reduce((p, c) => p + c, 0);

console.log(`Part 1 result: ${partOneResult}`);

const digitMap = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const partTwoResult = input
  .split("\n")
  .map((line) => {
    const firstDigit = line.match(
      /(\d|zero|one|two|three|four|five|six|seven|eight|nine)/g
    )[0];

    const lastDigit = line
      .split("")
      .reverse()
      .join("")
      .match(/(\d|enin|thgie|neves|xis|evif|ruof|eerht|owt|eno|orez)/)[0]
      .split("")
      .reverse()
      .join("");

    return parseInt(
      `${digitMap[firstDigit] || firstDigit}${
        digitMap[lastDigit] || lastDigit
      }`,
      10
    );
  })
  .reduce((p, c) => p + c, 0);

console.log(`Part 2 result: ${partTwoResult}`);
