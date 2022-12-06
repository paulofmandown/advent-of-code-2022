const fs = require("fs");

const containsChar = (c, str) => {
  for (let i = 0; i < str.length; ++i) {
    if (c === str[i]) return true;
  }
  return false;
};

const isStartOfSomething = (str) => {
  console.log(`Checking ${str}`);
  for (let i = 0; i < str.length - 1; ++i) {
    if (containsChar(str[i], str.substring(i + 1))) {
      return false;
    }
  }
  return true;
};

const solve = (err, data) => {
  const dataStr = data.toString();
  let foundSop = false;
  for (let i = 4; i < dataStr.length; ++i) {
    if (!foundSop && isStartOfSomething(dataStr.substring(i - 4, i))) {
      console.log(`Start of packet = ${i}`);
      foundSop = true;
    }
    if (i > 13 && isStartOfSomething(dataStr.substring(i - 14, i))) {
      console.log(`Start of message = ${i}`);
      return;
    }
  }
};

fs.readFile("day-06/input.txt", solve);
// fs.readFile("day-06/example.txt", solve);
