const fs = require("fs");

let time = 0;
let xValue = 1;
let sum = 0;

const tick = () => {
  time +=1;
  switch (time) {
    case 20:
    case 60:
    case 100:
    case 140:
    case 180:
    case 220:
      const str = time * xValue;
      console.log(`Strength = ${str} (${time} * ${xValue})`);
      sum += str;
  }
};

const solve = (err, data) => {
  const lines = data.toString().split("\n");
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if (line.length === 0) {
      continue;
    }
    const [ instruction, value ] = line.split(" ");
    switch (instruction) {
      case "addx":
        tick();
        tick();
        const valueInt = parseInt(value, 10);
        xValue += valueInt;
        console.log(`Adding ${valueInt} | ${xValue}`);
        break;
      case "noop": tick(); break;
      default: console.log(`unknown instruction ${instruction}`);
    }
  }
  console.log(`Sum = ${sum}`);
};

fs.readFile("day-10/input.txt", solve);
// fs.readFile("day-10/example.txt", solve);
// fs.readFile("day-10/example-2.txt", solve);
