import fs from "fs";
const input = fs.readFileSync("./day4.dat", "utf8");

const cards = input.split("\n").map((card, cardIndex) => {
  const allNumbers = card.split(": ")[1];
  const winningNumbers = allNumbers
    .split(" | ")[0]
    .trim()
    .replaceAll("  ", " ")
    .split(" ");
  const cardNumbers = allNumbers
    .split(" | ")[1]
    .trim()
    .replaceAll("  ", " ")
    .split(" ");

  return { cardIndex, winningNumbers, cardNumbers, count: 1 };
});

const evaluatePoints = (cards) => {
  let points = 0;
  cards.forEach(({ winningNumbers, cardNumbers }) => {
    const matches = cardNumbers.reduce((p, c) => {
      return winningNumbers.includes(c) ? p + 1 : p;
    }, 0);
    if (matches > 0) {
      points += Math.pow(2, matches - 1);
    }
  });
  return points;
};

const partOneResult = evaluatePoints(cards);

console.log(`Part 1 result: ${partOneResult}`);

const evaluateCount = (cards = []) => {
  cards.forEach(({ winningNumbers, cardNumbers, count, cardIndex }) => {
    const matches = cardNumbers.reduce(
      (p, c) => (winningNumbers.includes(c) ? p + 1 : p),
      0
    );
    for (let c = 0; c < count; c++) {
      for (let i = 0; i < matches; i++) {
        if (cardIndex + i + 1 < cards.length) {
          cards[cardIndex + i + 1].count += 1;
        }
      }
    }
  });

  return cards.reduce((p, { count }) => p + count, 0);
};

const partTwoResult = evaluateCount(cards);

console.log(`Part 2 result: ${partTwoResult}`);
