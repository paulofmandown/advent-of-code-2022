const fs = require("fs");

const containsChar = (c, str) => {
  for (let i = 0; i < str.length; ++i) {
    if (c === str[i]) return true;
  }
  return false;
};

const isStartOfMessage = (str) => {
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
  for (let i = 4; i < dataStr.length; ++i) {
    if (isStartOfMessage(dataStr.substring(i - 4, i))) {
      console.log(i + 1);
      return;
    }
  }
};

fs.readFile("day-06/input.txt", solve);
// fs.readFile("day-06/example.txt", solve);
