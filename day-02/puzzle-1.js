const fs = require("fs");

let partOneScore = 0;
let partTwoScore = 0;

const values = {
  rock: 1,
  paper: 2,
  scissors: 3,
  lose: 0,
  draw: 3,
  win: 6,
};

/* What each option beats */
const resultWin = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

/* What each option losess to */
const resultLose = {
  scissors: "rock",
  rock: "paper",
  paper: "scissors",
};

/* Part 1 translation */
const translate = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

/* Part 2 translation */
const translateTwo = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "lose",
  Y: "draw",
  Z: "win",
};

/* returns my result from a round, given what they threw and what I threw */
const getResult = (them, me) => {
  if (them == me) return "draw";
  if (resultWin[them] == me) return "lose";
  return "win";
};

const partOneDecrypt = (line, round) => {
  const themEncrypted = line.charAt(0);
  const meEncrypted = line.charAt(2);
  const them = translate[themEncrypted];
  const me = translate[meEncrypted];
  const result = getResult(them, me);
  const score = values[result] + values[me];
  console.log(`  (Pt1) ${themEncrypted} (${them}) vs ${meEncrypted} (${me}) | Result = ${result}`);
  return score;
};

const partTwoDecrypt = (line, round) => {
  const themEncrypted = line.charAt(0);
  const resultEncrypted = line.charAt(2);
  const them = translateTwo[themEncrypted];
  const result = translateTwo[resultEncrypted];
  console.log(`  (Pt2) They throw ${themEncrypted} (${them}) | Target result ${resultEncrypted} (${result})`);
  let myThrow = null;
  let score = null;
  switch (result) {
  case "draw":
    myThrow = them;
    score = values["draw"];
    break;
  case "win":
    myThrow = resultLose[them];
    score = values["win"];
    break;
  case "lose":
    myThrow = resultWin[them];
    score = values["lose"];
    break;
  }
  score += values[myThrow];
  console.log(`I need to ${result}, so throw ${myThrow}`);
  return score;
};

fs.readFile("day-02/input.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const rounds = data.toString().split("\n");
  for (let i = 0; i < rounds.length; ++i) {
    if (rounds[i].length < 3) continue;
    const round = i + 1;
    console.log(`Round ${round}`)
    partOneScore += partOneDecrypt(rounds[i], round);
    partTwoScore += partTwoDecrypt(rounds[i], round);
  }
  console.log(`Part 1 Score = ${partOneScore}`);
  console.log(`Part 2 Score = ${partTwoScore}`);
});
