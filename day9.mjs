import fs from "fs";
const input = fs.readFileSync("./day9.dat", "utf8");

const initialNumbers = input
  .split("\n")
  .map((str) => str.split(" ").map((str) => parseInt(str, 10)));

const newSequence = (numbers = []) => {
  const newNumbers = [];
  numbers.forEach((num, i) => {
    if (i !== 0) {
      newNumbers.push(num - numbers[i - 1]);
    }
  });
  return newNumbers;
};

const isLastSequence = (numbers = []) =>
  numbers.filter((n) => n !== 0).length === 0;

const getAllSequences = () =>
  initialNumbers.map((numbers) => {
    const sequences = [numbers];

    while (!isLastSequence(sequences[sequences.length - 1])) {
      sequences.push(newSequence(sequences[sequences.length - 1]));
    }

    return sequences;
  });

const findNextNumber = (sequences = [], reverse = false) => {
  sequences.reverse().forEach((arr, i) => {
    if (reverse) {
      arr.reverse();
    }

    arr.push(
      i === 0
        ? 0
        : reverse
        ? arr[arr.length - 1] - sequences[i - 1][arr.length - 1]
        : arr[arr.length - 1] + sequences[i - 1][arr.length - 1]
    );
  });

  return sequences[sequences.length - 1][
    sequences[sequences.length - 1].length - 1
  ];
};

const partOneResult = getAllSequences().reduce(
  (p, seq) => p + findNextNumber(seq),
  0
);

console.log(`Part 1 result: ${partOneResult}`);

const partTwoResult = getAllSequences().reduce(
  (p, seq) => p + findNextNumber(seq, true),
  0
);

console.log(`Part 2 result: ${partTwoResult}`);
