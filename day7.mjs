import fs from "fs";
const input = fs.readFileSync("./day7.dat", "utf8");

const cardValues = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

const part2Values = {
  J: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  Q: 10,
  K: 11,
  A: 12,
};

const hands = input.split("\n").map((line) => ({
  cards: line.split(" ")[0].split(""),
  bet: parseInt(line.split(" ")[1], 10),
}));

const tieBreak = (a, b, partTwo) => {
  const values = partTwo ? part2Values : cardValues;
  let index = 0;
  let scoreA = values[a.cards[index]];
  let scoreB = values[b.cards[index]];
  while (scoreA === scoreB && index < 5) {
    index++;
    scoreA = values[a.cards[index]];
    scoreB = values[b.cards[index]];
  }
  return scoreB - scoreA;
};

const findMatches = (cards = [], uniqueCards = [], jokers = 0) => {
  let biggestMatchSize = 0;
  let uniqueMatches = 0;
  uniqueCards.forEach((card) => {
    const matches = cards.filter((c) => c === card);
    biggestMatchSize = Math.max(matches.length, biggestMatchSize);
    if (matches.length > 1) uniqueMatches++;
  });
  biggestMatchSize += jokers;
  if (uniqueMatches === 0 && jokers > 0) uniqueMatches = 1;
  return { biggestMatchSize, uniqueMatches };
};

const findExactMatches = (
  a,
  b,
  uniqueCardsA,
  uniqueCardsB,
  size,
  jokersInA = 0,
  jokersInB = 0,
  isPartTwo = false
) => {
  let matchesA = findMatches(a.cards, uniqueCardsA, jokersInA);
  let matchesB = findMatches(b.cards, uniqueCardsB, jokersInB);

  if (size === 2) {
    // 4 of a kind or full house?
    if (matchesA.biggestMatchSize > matchesB.biggestMatchSize) return -1;
    else if (matchesA.biggestMatchSize < matchesB.biggestMatchSize) return 1;
    else return tieBreak(a, b, isPartTwo);
  } else {
    // size is 3
    // two pairs or three of a kind?
    if (matchesA.uniqueMatches > matchesB.uniqueMatches) return 1;
    else if (matchesA.uniqueMatches < matchesB.uniqueMatches) return -1;
    else return tieBreak(a, b, isPartTwo);
  }
};

hands.sort((a, b) => {
  const uniqueCardsA = new Set(a.cards);
  const uniqueCardsB = new Set(b.cards);
  if (uniqueCardsA.size > uniqueCardsB.size) return 1;
  else if (uniqueCardsA.size < uniqueCardsB.size) return -1;
  else {
    // Same amount of unique cards
    const size = uniqueCardsA.size;
    if (size === 2 || size === 3) {
      // find what's up
      return findExactMatches(a, b, uniqueCardsA, uniqueCardsB, size);
    } else {
      return tieBreak(a, b);
    }
  }
});

const partOneResult = hands.reduce(
  (p, c, ci, { length }) => p + c.bet * (length - ci),
  0
);

console.log(`Part 1 result: ${partOneResult}`);

hands.sort((a, b) => {
  const jokersInA = a.cards.filter((c) => c === "J").length;
  const jokersInB = b.cards.filter((c) => c === "J").length;

  const uniqueCardsA = new Set(a.cards.filter((c) => c !== "J"));
  const uniqueCardsB = new Set(b.cards.filter((c) => c !== "J"));

  const matchesA = findMatches(a.cards, uniqueCardsA, jokersInA);
  const matchesB = findMatches(b.cards, uniqueCardsB, jokersInB);

  if (matchesA.uniqueMatches === matchesB.uniqueMatches) {
    if (matchesA.biggestMatchSize > matchesB.biggestMatchSize) return -1;
    else if (matchesA.biggestMatchSize < matchesB.biggestMatchSize) return 1;
    else return tieBreak(a, b, true);
  }

  if (matchesA.biggestMatchSize === matchesB.biggestMatchSize) {
    if (matchesA.uniqueMatches > matchesB.uniqueMatches) return -1;
    else if (matchesA.uniqueMatches < matchesB.uniqueMatches) return 1;
    else return tieBreak(a, b, true);
  }
  if (matchesA.biggestMatchSize > matchesB.biggestMatchSize) return -1;
  else return 1;
});

const partTwoResult = hands.reduce(
  (p, c, ci, { length }) => p + c.bet * (length - ci),
  0
);

console.log(`Part 2 result: ${partTwoResult}`);
