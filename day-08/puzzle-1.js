const fs = require("fs");

const check = (grid, initialX, initialY, xMod, yMod) => {
  const treeHeight = grid[initialY][initialX];
  for (
    let [x, y] = [initialX + xMod, initialY + yMod];
    grid[x] && grid[x][y];
    [x, y] = [ x + xMod, y + yMod ]
  ) {
    const obscuringHeight = grid[y][x];
    if (treeHeight <= obscuringHeight) {
      return true;
    }
  }
  return false;
};

const getViewingDistance = (grid, initialX, initialY, xMod, yMod) => {
  const treeHeight = grid[initialY][initialX];
  let distance = 0;
  for (
    let [x, y] = [initialX + xMod, initialY + yMod];
    grid[x] && grid[x][y];
    [x, y] = [ x + xMod, y + yMod ]
  ) {
    distance += 1;
    const obscuringHeight = grid[y][x];
    if (treeHeight <= obscuringHeight) {
      break;
    };
  }
  return distance;
};

const solve = (err, data) => {
  const rows = data.toString().split("\n");
  rows.pop();
  const height = rows.length;
  const width = rows[0].length;
  let numExposed = height * 2 + width * 2 - 4;
  let bestScenicScore = 0;
  console.log(`There are ${numExposed} trees around the edge`);
  for (let y = 1; y < height - 1; ++y) {
    for (let x = 1; x < width - 1; ++x) {
      const obscured = check(rows, x, y, -1, 0) && // left
        check(rows, x, y, 1, 0) && // right
        check(rows, x, y, 0, -1) && // up
        check(rows, x, y, 0, 1); // down
      if (!obscured) {
        numExposed += 1;
      }
      const scenicScore = getViewingDistance(rows, x, y, -1, 0) *
        getViewingDistance(rows, x, y, 1, 0) *
        getViewingDistance(rows, x, y, 0, -1) *
        getViewingDistance(rows, x, y, 0, 1);
      if (scenicScore > bestScenicScore) {
        bestScenicScore = scenicScore;
      }
    }
  }
  console.log(`There are ${numExposed} exposed trees in total`);
  console.log(`The best possible scenic score is ${bestScenicScore}`);
};

fs.readFile("day-08/input.txt", solve);
// fs.readFile("day-08/example.txt", solve);
