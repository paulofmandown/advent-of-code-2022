const fs = require("fs");

class RopeNode {
  constructor (x, y, id, child) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.child = child;
    this.parent = null;
  }
  toString = () => { return `${this.id}:${this.x},${this.y}`};
}

const getRope = (len) => {
  let prev = null;
  let node = null;
  for (let i = 0; i < len; ++i) {
    node = new RopeNode(0, 0, i, prev);
    if (prev != null) {
      prev.parent = node;
    }
    prev = node;
  }
  return node;
};

const pullRope = (head, dir, len, tailPositions) => {
  for (let j = 0; j < len; ++j) {
    switch (dir) {
      case "U": head.y -= 1; break;
      case "D": head.y += 1; break;
      case "L": head.x -= 1; break;
      case "R": head.x += 1; break;
      default: console.log(`Got unexpected direction: ${dir}`);
    }
    let node = head.child;
    while (node) {
      console.log(`checking node ${node} against parent ${node.parent}`);
      const xDiff = node.x - node.parent.x;
      const yDiff = node.y - node.parent.y;
      if (xDiff > 1) {
        node.x -= 1;
        node.y = node.parent.y;
      } else if (xDiff < -1) {
        node.x += 1;
        node.y = node.parent.y;
      }
      if (yDiff > 1) {
        node.y -= 1;
        node.x = node.parent.x;
      } else if (yDiff < -1) {
        node.y += 1;
        node.x = node.parent.x;
      }
      if (!node.child) {
        const pos = `${node.x},${node.y}`;
        console.log(`Tail visits ${pos}, ${tailPositions[pos] ? "an old" : "a new"} position`);
        tailPositions[pos] = 1;
      }
      node = node.child;
    }
  }
};

const solve = (err, data) => {
  const tailPositions = {};
  const head = getRope(2);
  const lines = data.toString().split("\n");
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if (line.length === 0) continue;
    const [ dir, len] = line.split(" ");
    pullRope(head, dir, len, tailPositions);
  }
  console.log(`Tail visited ${Object.keys(tailPositions).length} position(s)`);
};

// fs.readFile("day-09/input.txt", solve);
fs.readFile("day-09/example.txt", solve);
