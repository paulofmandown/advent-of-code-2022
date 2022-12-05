const fs = require("fs");

const getStacks = (inputSectionOne) => {
  const lines = inputSectionOne.split("\n");
  const stacks = [];
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if (line.indexOf("[") < 0) {
      break;
    }
    let crate = null;
    for (let j = 0; j * 4 < line.length; ++j) {
      if (stacks[j] === undefined) {
        stacks[j] = [];
      }
      crate = line.substring(j * 4, j * 4 + 4).trim();
      console.log(`Next crate = ${crate}`);
      if (crate !== "") {
        stacks[j].unshift(crate[1]);
      }
    }
  }
  console.log(stacks);
  return stacks;
};

const printStacks = (stacks) => {
  let maxHeight = 0;
  for (let i = 0; i < stacks.length; ++i) {
    if (stacks[i].length > maxHeight) {
      maxHeight = stacks[i].length;
    }
  }
  for (let i = maxHeight - 1; i > -1; --i) {
    let row = "";
    for (let j = 0; j < stacks.length; ++j) {
      if (stacks[j][i]) {
        row += `[${stacks[j][i]}] `
      } else {
        row += "    ";
      }
    }
    console.log(row);
  }
  let lastRow = "";
  for (let i = 0; i < stacks.length; ++i) {
    lastRow += ` ${i + 1}  `;
  }
  console.log(lastRow);
};

/* reading comprehension devil struck */
const moveCratesInStacks = (stacks, count, source, destination) => {
  const moving = [];
  for (let j = 0; j < parseInt(count, 10); ++j) {
    moving.unshift(stacks[source - 1].pop());
  }
  stacks[destination - 1].push(...moving);
};

const moveCratesOneByOne = (stacks, count, source, destination) => {
  for (let i = 0; i < parseInt(count, 10); ++i) {
    stacks[destination - 1].push(stacks[source - 1].pop());
  }
};

const rearrangeStacks = (stacks, inputSectionTwo) => {
  const lines = inputSectionTwo.split("\n");
  for (let i = 0; i < lines.length; ++i) {
    printStacks(stacks);
    const line = lines[i];
    if (line.length === 0) break;
    const [ _, count, source, destination ] = line.match(/^move (\d+) from (\d+) to (\d+)$/);
    console.log(`Moving ${count} crates from stack ${source} to stack ${destination}`);
    console.log(`Source stack = ${stacks[source - 1].join("")}`);
    console.log(`Destination stack = ${stacks[destination - 1].join("")}`);
    moveCratesOneByOne(stacks, count, source, destination);
    console.log(`Source stack after move = ${stacks[source - 1].join("")}`);
    console.log(`Destination stack after move = ${stacks[destination - 1].join("")}`);
  }
  let topCrates = "";
  for (let i = 0; i < stacks.length; ++i) {
    topCrates += stacks[i][stacks[i].length - 1];
  }
  printStacks(stacks);
  console.log(topCrates);
};

const solve = (err, data) => {
  const inputSections = data.toString().split("\n\n");
  const stacks = getStacks(inputSections[0]);
  rearrangeStacks(stacks, inputSections[1]);
};

fs.readFile("day-05/input.txt", solve);
// fs.readFile("day-05/example.txt", solve);
