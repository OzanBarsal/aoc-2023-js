import fs from "fs";
const input = fs.readFileSync("./day2.dat", "utf8");

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const games = input.split("\n").map((line, gameIndex) => {
  const sets = line
    .split(": ")[1]
    .split("; ")
    .map((set) => {
      const draws = {
        red: 0,
        green: 0,
        blue: 0,
      };
      set.split(", ").forEach((draw) => {
        draws[draw.split(" ")[1]] += parseInt(draw.split(" ")[0]);
      });

      return draws;
    });
  return sets;
});

let partOneResult = 0;
games.forEach((game, gameIndex) => {
  let valid = true;
  game.forEach((set) => {
    Object.keys(cubes).forEach((key) => {
      if (cubes[key] < set[key]) {
        valid = false;
      }
    });
  });
  if (valid) {
    partOneResult += 1 + gameIndex;
  }
});

console.log(`Part 1 result: ${partOneResult}`);

const partTwoResult = games
  .map((game) => ({
    red: Math.max(...game.map(({ red }) => red)),
    green: Math.max(...game.map(({ green }) => green)),
    blue: Math.max(...game.map(({ blue }) => blue)),
  }))
  .reduce((p, { red, green, blue }) => p + red * green * blue, 0);

console.log(`Part 2 result: ${partTwoResult}`);
