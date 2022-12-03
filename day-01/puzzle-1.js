const fs = require("fs");
let max = 0;
let topThree = [0, 0, 0];

fs.readFile("day-01/input.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const elves = data.toString().split("\n\n");
  for (let i = 0; i < elves.length; ++i) {
    const name = `elf ${i + 1}`;
    console.log(`parsing ${name}'s contents`);
    const stars = elves[i].split("\n");
    console.log(`${name} has ${stars.length} stars`);

    // Count calories
    let size = 0;
    for (let j = 0; j < stars.length; ++j) {
      size += parseInt(stars[j], 10);
    }
    console.log(`${name} is holding ${size} Calories worth of stars`);

    // Check max
    if (size > max) {
      console.log(`\n\n${name} is holding the currently known largest amount of calories!\n\n`);
      console.log(`\n\n${name} is holding the following stars:\n${elves[i]}\n\n`);
      max = size;
    }

    // Check top three
    for (let i = 0; i < topThree.length; ++i) {
      if (size > topThree[i]) {
        topThree.splice(i, 0, size);
        topThree.pop();
        break;
      }
    }

    if (topThree.length > 3) {
      console.error("Uh oh, we've got more than three in here");
      return;
    }
  }

  const topThreeTotal = topThree.reduce((prev, curr) => prev + curr, 0);
  console.log(`Most calories is ${max}`);
  console.log(`Top three are ${topThree.join(',')}, with a total of ${topThreeTotal}`)
});
