import fs from "fs";
const input = fs.readFileSync("./day12.dat", "utf-8");

const rows = input.split("\n").map((row) => ({
  data: row.split(" ")[0].replaceAll("#", "0").replaceAll(".", "1"),
  groups: row.split(" ")[1].split(","),
}));

const getRegex = (groups = []) =>
  new RegExp(
    "^1*" +
      groups
        .map(
          (num, index) => `0{${num}}${index < groups.length - 1 ? "1+" : "1*$"}`
        )
        .join("")
  );

const guess = ({ source = "", groups }) => {
  const regex = getRegex(groups);
  const known = source.replaceAll("?", "").length;
  const unknown = source.length - known;
  const total = Math.pow(2, unknown);
  console.log(`There are ${total} possibilities...`);
  let current = 0;
  let validCount = 0;

  while (current < total) {
    let guessStr = current.toString(2);
    const curLen = guessStr.length;
    let curStr = source;
    guessStr =
      Array(unknown - curLen)
        .fill("0")
        .join("") + guessStr;

    for (let i = 0; i < unknown; i++) {
      curStr = curStr.replace("?", guessStr.charAt(i));
    }

    const valid = regex.test(curStr);

    if (valid) {
      validCount++;
    }

    current++;
  }

  return validCount;
};

const partOneResult = rows.reduce(
  (p, { data, groups }) => p + guess({ source: data, groups }),
  0
);

console.log(`Part one result is: ${partOneResult}`);

const unfoldCount = 5;

const unfold = (row) => {
  let source = "";
  const groups = [];
  for (let i = 0; i < unfoldCount; i++) {
    source += row.data + (i === unfoldCount - 1 ? "" : "");
    groups.push(...row.groups);
  }
  return { source, groups };
};

const partTwoResult = rows.reduce((p, row, i, { length }) => {
  console.log(`Processing ${i + 1} of ${length}...`);
  return p + guess(unfold(row));
}, 0);

console.log(`Part two result is: ${partTwoResult}`);
