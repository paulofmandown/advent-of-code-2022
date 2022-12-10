const fs = require("fs");

let pixels = [];
let time = 0;
let xValue = 1;
let sum = 0;

const tick = () => {
  console.log(`Time ${time} %40 ${time % 40}. Sprite covers ${xValue - 1}, ${xValue}, and ${xValue + 1}`);
  pixels[time] = 0;
  for (let i = -1; i < 2; ++i) {
    if (time % 40 === xValue + i) {
      console.log(`Pixel ${time} is lit`);
      pixels[time] = 1;
      break;
    }
  }
  time +=1;
  if ((time + 20) % 40 === 0) {
    const str = time * xValue;
    console.log(`Strength = ${str} (${time} * ${xValue})`);
    sum += str;
  }
};

const drawPixels = () => {
  console.log(pixels);
  for (let i = 0; pixels[i];) {
    let line = "";
    for (let j = 0; j < 40; ++j) {
      line += pixels[i] === 1 ? "#" : ".";
      i += 1;
    }
    console.log(line);
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
  drawPixels();
};

fs.readFile("day-10/input.txt", solve);
// fs.readFile("day-10/example.txt", solve);
// fs.readFile("day-10/example-2.txt", solve);
