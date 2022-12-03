const fs = require("fs");

let partOneScore = 0;
let partTwoScore = 0;

const orderedItems = "-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const splitCompartments = (line) => {
  const mid =  line.length / 2;
  return [line.substring(0, mid), line.substring(mid)];
};

const getPriority = (item) => {
  return orderedItems.indexOf(item);
};

const checkRucksackForDupes = (line) => {
  let foundDupe = false;
  const checkedLetters = {};
  const compartments = splitCompartments(line);
  console.log(`  c1 - ${compartments[0]}| c2 - ${compartments[1]}`);
  for (let i = 0; i < compartments[0].length; ++i) {
    const item = compartments[0][i];
    if (checkedLetters[item]) {
      continue;
    }
    checkedLetters[item] = true;
    const index = compartments[1].indexOf(item);
    if (index > -1) {
      foundDupe = true;
      const priority = getPriority(item);
      console.log(`  Found ${item} in both compartments with a priority of ${priority}`);
      return priority;
    }
  }
  return 0;
}

const checkGroupForDupes = (group) => {
  for (let i = 0; i < group[0].length; ++i) {
    const item = group[0][i];
    if (group[1].indexOf(item) > -1 && group[2].indexOf(item) > -1) {
      return getPriority(item);
    }
  }
};

const solve = (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.toString().split("\n");
  const group = [];
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i].length === 0) continue;
    console.log(`Checking rucksack ${i + 1}`);
    partOneScore += checkRucksackForDupes(lines[i]);
    group.push(lines[i]);
    if (group.length === 3) {
      partTwoScore += checkGroupForDupes(group);
      group.splice(0, group.length);
    }
  }
  console.log(`Part one answer = ${partOneScore}`);
  console.log(`Part two answer = ${partTwoScore}`);
};

fs.readFile("day-03/input.txt", solve);
// fs.readFile("day-03/example.txt", solve);
