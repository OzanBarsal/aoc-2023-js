import fs from "fs";
const input = fs.readFileSync("./day10.dat", "utf8");

const pipes = input.split("\n");

const legend = {
  up: {
    "|": "up",
    7: "left",
    F: "right",
  },
  down: {
    "|": "down",
    J: "left",
    L: "right",
  },
  left: {
    "-": "left",
    L: "up",
    F: "down",
  },
  right: {
    "-": "right",
    7: "down",
    J: "up",
  },
};

const getCurrentCharacter = (currentLocation) =>
  pipes[currentLocation.y][currentLocation.x];

const getNextDirection = (currentLocation, currentDirection) =>
  legend[currentDirection][getCurrentCharacter(currentLocation)];

const swapCharacter = ({ x, y }, char = "X", arr) => {
  arr[y] = arr[y].substring(0, x) + char + arr[y].substring(x + 1);
};

const polygon = [];

const navigate = () => {
  let x = -1;
  let currentLocation = {
    y: pipes.findIndex((row) => {
      const match = row.indexOf("S");
      if (match !== -1) {
        x = match;
        return true;
      }
    }),
    x: x,
  };

  let steps = 0;

  let currentCharacter = "X";
  let direction = "down";

  while (currentCharacter !== "S") {
    switch (direction) {
      case "up":
        currentLocation.y -= 1;
        break;
      case "down":
        currentLocation.y += 1;
        break;
      case "left":
        currentLocation.x -= 1;
        break;
      case "right":
        currentLocation.x += 1;
      default:
        break;
    }

    const prevDirection = direction;
    direction = getNextDirection(currentLocation, direction);
    if (direction !== prevDirection) {
      polygon.push({ ...currentLocation });
    }

    currentCharacter = getCurrentCharacter(currentLocation);
    swapCharacter(currentLocation, "X", pipes);
    steps++;
  }

  return steps;
};

const totalSteps = navigate();
const partOneResult = totalSteps / 2;

console.log(`Part 1 result: ${partOneResult}`);

let partTwoResult = 0;

// totally stole this from
// https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/17490923#17490923

const isInside = (p, polygon) => {
  let isInside = false,
    minX = polygon[0].x,
    maxX = polygon[0].x,
    minY = polygon[0].y,
    maxY = polygon[0].y;

  for (let n = 1; n < polygon.length; n++) {
    const q = polygon[n];
    minX = Math.min(q.x, minX);
    maxX = Math.max(q.x, maxX);
    minY = Math.min(q.y, minY);
    maxY = Math.max(q.y, maxY);
  }

  if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
    return false;
  }

  let i = 0,
    j = polygon.length - 1;

  for (i, j; i < polygon.length; j = i++) {
    if (
      polygon[i].y > p.y != polygon[j].y > p.y &&
      p.x <
        ((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) /
          (polygon[j].y - polygon[i].y) +
          polygon[i].x
    ) {
      isInside = !isInside;
    }
  }

  return isInside;
};

pipes.forEach((row, y) => {
  for (let x = 0; x < row.length; x++) {
    if (row.charAt(x) !== "X" && isInside({ x, y }, polygon)) partTwoResult++;
  }
});

console.log(`Part 2 result: ${partTwoResult}`);
