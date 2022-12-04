const fs = require("fs");

const getElvesAssignments = (line) => {
  const assignments = line.split(",");
  assignments[0] = assignments[0].split("-");
  assignments[1] = assignments[1].split("-");

  return [
    { from: parseInt(assignments[0][0], 10), to: parseInt(assignments[0][1], 10) },
    { from: parseInt(assignments[1][0], 10), to: parseInt(assignments[1][1], 10) }
  ];
};

const fullyContains = (elf1, elf2) => {
  return elf1.from <= elf2.from && elf1.to >= elf2.to ||
    elf1.from >= elf2.from && elf1.to <= elf2.to;
};

const overlaps = (elf1, elf2) => {
  return elf1.from >= elf2.from && elf1.from <= elf2.to ||
    elf1.to >= elf2.from && elf1.to <= elf2.to ||
    elf2.from >= elf1.from && elf2.from <= elf1.to ||
    elf2.to >= elf1.from && elf2.to <= elf1.to;
};

const solve = (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.toString().split("\n");
  let pairsFullyContaining = 0;
  let pairsOverlapping = 0;
  for (let i = 0; i < lines.length; ++i) {
    if (lines[i].length < 1) continue;
    const [ elf1, elf2 ] = getElvesAssignments(lines[i]);
    pairsFullyContaining += fullyContains(elf1, elf2) ? 1 : 0;
    pairsOverlapping += overlaps(elf1, elf2) ? 1 : 0;
  }
  console.log(`Pairs fully containing = ${pairsFullyContaining}`);
  console.log(`Pairs overlapping = ${pairsOverlapping}`)
};

fs.readFile("day-04/input.txt", solve);
