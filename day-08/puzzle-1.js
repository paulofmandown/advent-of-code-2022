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

const solve = (err, data) => {
  const rows = data.toString().split("\n");
  rows.pop();
  const height = rows.length;
  const width = rows[0].length;
  let numExposed = height * 2 + width * 2 - 4;
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
    }
  }
  console.log(`There are ${numExposed} exposed trees in total`);
};

fs.readFile("day-08/input.txt", solve);
// fs.readFile("day-08/example.txt", solve);
