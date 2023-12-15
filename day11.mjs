import fs from "fs";
const input = fs.readFileSync("./day11.dat", "utf8");

const rows = input.split("\n");

const emptyRows = [];
const emptyCols = [];

const expand = (arr = [], partTwo = false) => {
  let output = [];

  arr.forEach((row, y) => {
    output.push(row);
    if (row.indexOf("#") === -1) {
      if (partTwo) {
        emptyRows.push(y);
      } else {
        output.push(row);
      }
    }
  });

  let xLength = output[0].length;
  let x = 0;

  while (x < xLength) {
    let col = output.map((row) => row.charAt(x)).join("");

    if (col.indexOf("#") === -1) {
      if (partTwo) {
        emptyCols.push(x);
      } else {
        output = output.map(
          (row) => row.substring(0, x) + "." + row.substring(x)
        );
        xLength++;
        x++;
      }
    }
    x++;
  }

  return output;
};

const expanded = expand(rows);

const galaxies = [];

expanded.forEach((row, y) => {
  if (row.indexOf("#") !== -1) {
    row.split("").forEach((char, x) => {
      if (char === "#") {
        galaxies.push({ x, y });
      }
    });
  }
});

const getPairs = (arr) =>
  arr.map((v, i) => arr.slice(i + 1).map((w) => [v, w])).flat();

const pairs = getPairs(galaxies);

const partOneResult = pairs.reduce(
  (p, c) => p + Math.abs(c[0].x - c[1].x) + Math.abs(c[0].y - c[1].y),
  0
);

console.log(`Part 1 result: ${partOneResult}`);

const universe = expand(rows, true);

const partTwoGalaxies = [];

universe.forEach((row, y) => {
  if (row.indexOf("#") !== -1) {
    row.split("").forEach((char, x) => {
      if (char === "#") {
        partTwoGalaxies.push({ x, y });
      }
    });
  }
});

const partTwoPairs = getPairs(partTwoGalaxies);

const partTwoResult = partTwoPairs.reduce((p, c) => {
  const expandedRowCount = emptyRows.filter(
    (num) => num < Math.max(c[0].y, c[1].y) && num > Math.min(c[0].y, c[1].y)
  ).length;
  const expandedColCount = emptyCols.filter(
    (num) => num < Math.max(c[0].x, c[1].x) && num > Math.min(c[0].x, c[1].x)
  ).length;

  const additionalDistance = (expandedColCount + expandedRowCount) * 999999;

  return (
    p +
    Math.abs(c[0].x - c[1].x) +
    Math.abs(c[0].y - c[1].y) +
    additionalDistance
  );
}, 0);

console.log(`Part 2 result: ${partTwoResult}`);
