const fs = require("fs");

const pointsMap = {
  a: 1, // rock
  b: 2, // paper
  c: 3, // scissors
  x: 1, // rock
  y: 2, // paper
  z: 3, // scissors
};

const points = [1, 2, 3];

const scenarios = {
  losses: [
    ["A", "X"],
    ["B", "X"],
    ["C", "X"],
  ].map((scenario) => scenario.toString()),
  wins: [
    ["A", "Z"],
    ["B", "Z"],
    ["C", "Z"],
  ].map((scenario) => scenario.toString()),
  ties: [
    ["A", "Y"],
    ["B", "Y"],
    ["C", "Y"],
  ].map((scenario) => scenario.toString()),
};

// Read in and parse the test file
fs.readFile(`${__dirname}/input.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  }
  const match = data.split(/\n/);
  let myPoints = 0;

  match.forEach((round) => {
    const turns = round.split(/\s/);
    const scenario = turns.toString();
    const opponent = pointsMap[turns[0].toLowerCase()];

    // you win
    if (scenarios.wins.includes(scenario)) {
      myPoints += 6 + (points[points.indexOf(opponent) + 1] ? points[points.indexOf(opponent) + 1] : points[0]);
    }
    // you lose
    else if (scenarios.losses.includes(scenario)) {
      myPoints +=
        0 + (points[points.indexOf(opponent) - 1] ? points[points.indexOf(opponent) - 1] : points[points.length - 1]);
    }
    // tie
    else if (scenarios.ties.includes(scenario)) {
      myPoints += 3 + points[points.indexOf(opponent)];
    }
  });
  console.log(myPoints);
});
