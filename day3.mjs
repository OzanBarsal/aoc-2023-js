import fs from "fs";
const input = fs.readFileSync("./day3.dat", "utf8");

const rows = input.split("\n");

const numbers = [];

rows.forEach((row, rowIndex) => {
  let searchString = row;
  while (/\d/.test(searchString)) {
    const diff = row.length - searchString.length;
    const digitIndex = diff + searchString.search(/\d/);

    if (digitIndex === 0 || /[^\d]/.test(row[digitIndex - 1])) {
      numbers.push({
        rowIndex,
        startIndex: digitIndex,
      });
    }

    if (digitIndex === row.length - 1 || /[^\d]/.test(row[digitIndex + 1])) {
      numbers[numbers.length - 1].endIndex = digitIndex;
    }

    searchString = row.substring(digitIndex + 1);
  }
});

const partNumbers = numbers.filter(({ rowIndex, startIndex, endIndex }) => {
  let searchArea = "";
  if (rowIndex > 0) {
    searchArea += rows[rowIndex - 1].substring(
      Math.max(startIndex - 1, 0),
      Math.min(rows[rowIndex - 1].length, endIndex + 2)
    );
  }
  if (startIndex > 0) {
    searchArea += rows[rowIndex].substring(startIndex - 1, startIndex);
  }
  if (endIndex < rows[rowIndex].length - 1) {
    searchArea += rows[rowIndex].substring(endIndex + 1, endIndex + 2);
  }
  if (rowIndex < rows.length - 1) {
    searchArea += rows[rowIndex + 1].substring(
      Math.max(startIndex - 1, 0),
      Math.min(rows[rowIndex + 1].length, endIndex + 2)
    );
  }

  return /[^\d\.]/.test(searchArea);
});

const partOneResult = partNumbers
  .map(({ startIndex, endIndex, rowIndex }) => {
    return parseInt(rows[rowIndex].substring(startIndex, endIndex + 1));
  })
  .reduce((p, c) => p + c, 0);

console.log(`Part 1 result: ${partOneResult}`);

const gears = [];

rows.forEach((row, rowIndex) => {
  let searchString = row;
  while (/\*/.test(searchString)) {
    const diff = row.length - searchString.length;
    const gearIndex = diff + searchString.search(/\*/);
    gears.push({ gearIndex, rowIndex });
    searchString = row.substring(gearIndex + 1);
  }
});

let partTwoResult = 0;

gears.forEach(({ gearIndex, rowIndex }) => {
  const gearNumbers = numbers.filter(
    ({ startIndex, endIndex, rowIndex: numRow }) =>
      (numRow === rowIndex ||
        numRow === rowIndex - 1 ||
        numRow === rowIndex + 1) &&
      startIndex <= gearIndex + 1 &&
      endIndex >= gearIndex - 1
  );

  if (gearNumbers.length === 2) {
    const firstNumber = gearNumbers[0];
    const secondNumber = gearNumbers[1];
    const firstNumberInt = parseInt(
      rows[firstNumber.rowIndex].substring(
        firstNumber.startIndex,
        firstNumber.endIndex + 1
      ),
      10
    );
    const secondNumberInt = parseInt(
      rows[secondNumber.rowIndex].substring(
        secondNumber.startIndex,
        secondNumber.endIndex + 1
      ),
      10
    );

    partTwoResult += firstNumberInt * secondNumberInt;
  }
});

console.log(`Part 2 result: ${partTwoResult}`);
