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
    console.log(stacks);
  }
};

const solve = (err, data) => {
  const inputSections = data.toString().split("\n\n");
  getStacks(inputSections[0]);
};

fs.readFile("day-05/input.txt", solve);
