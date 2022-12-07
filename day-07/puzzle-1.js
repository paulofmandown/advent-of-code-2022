const fs = require("fs");

const root = "/";
let sumUnderAHundredK = 0;

const newFile = (name, parent) => {
  return {
    name: name,
    parent: parent,
    size: 0,
  };
};

const newDirectory = (name, parent) => {
  const dir = newFile(name, parent);
  dir.children = {};
  return dir;
};

const directories = {
  [root]: newDirectory(root, null),
};

const bumpSizes = (node, size) => {
  console.log(`Increasing ${node.name} size by ${size}`);
  node.size += size;
  if (node.parent) {
    bumpSizes(node.parent, size);
  }
};

const getDirSizes = (node) => {
  console.log(`${node.name} = ${node.size}`);
  if (node.size <= 100_000) {
    sumUnderAHundredK += node.size;
  }
  for (child in node.children) {
    if (node.children[child].children) {
      getDirSizes(node.children[child]);
    }
  }
}

const solve = (err, data) => {
  const lines = data.toString().split("\n");
  let current = directories[root];
  for (let i = 1; i < lines.length; ++i) {
    const line = lines[i];
    console.log(`Parsing line ${line}`);
    if (line.length === 0) {
      continue;
    }
    if (line[0] === "$") {
      if (line.substring(0, 5) === "$ cd ") {
        const dir = line.substring(5);
        if (dir === "..") {
          console.log("Going up");
          current = current.parent;
        } else {
          console.log("Going down");
          current = current.children[dir];
        }
      }
    } else {
      if (line.substring(0, 4) === "dir ") {
        console.log("New child dir");
        const name = line.substring(4)
        current.children[name] = newDirectory(name, current);
      } else {
        console.log("New child file");
        const [ size, name ] = line.split(" ");
        if (current.children[name] === undefined) {
          console.log(`Adding previously unknown child ${name} to ${current.name}`)
          bumpSizes(current, parseInt(size, 10));
          current.children[name] = newFile(name, current);
        }
      }
    }
  }
  getDirSizes(directories[root]);
  console.log(`sumUnderAHundredK = ${sumUnderAHundredK}`);
};

fs.readFile("day-07/input.txt", solve);
// fs.readFile("day-07/example.txt", solve);
