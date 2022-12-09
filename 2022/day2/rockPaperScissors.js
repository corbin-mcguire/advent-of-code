const fs = require('fs');

const pointsMap = {
  a: 1, // rock
  b: 2, // paper
  c: 3, // scissors
  x: 1, // rock
  y: 2, // paper
  z: 3, // scissors
};

const points = [1, 2, 3];

// X = LOSS
// Y = TIE
// Z = WIN

// 1 1 you lose 1 - 3 = -2
// 2 1 you lose 2 - 1 =  1
// 3 1 you lose 3 - 2 =  1

// 1 2 tie 1 - 1 = 0
// 2 2 tie 2 - 2 = 0
// 3 2 tie 3 - 3 = 0

// 1 3 you win 1 - 2 =  -1
// 2 3 you win 2 - 3 =  -1
// 3 3 you win 3 - 1 =   2

// you lose
// 1 1 = 2
// 2 1 = 3
// 3 1 = 4
const losses = [
  ['A', 'X'],
  ['B', 'X'],
  ['C', 'X'],
].map((scenario) => scenario.toString());

// tie
// 1 2 = 3
// 2 2 = 4
// 3 2 = 5
const ties = [
  ['A', 'Y'],
  ['B', 'Y'],
  ['C', 'Y'],
].map((scenario) => scenario.toString());

// you win
// 1 3 = 4
// 2 3 = 5
// 3 3 = 6
const wins = [
  ['A', 'Z'],
  ['B', 'Z'],
  ['C', 'Z'],
].map((scenario) => scenario.toString());

// Read in and parse the test file
fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }
  const match = data.split(/\n/);

  const matchResults = {
    winner: {
      player: null,
      points: null,
    },
    opponent: {
      wins: 0,
      points: 0,
    },
    you: {
      wins: 0,
      points: 0,
    },
    ties: 0,
    rounds: 0,
  };

  match.forEach((round) => {
    matchResults.rounds += 1;
    const turns = round.split(/\s/);
    const scenario = turns.toString();

    const you = pointsMap[turns.pop().toLowerCase()];
    const opponent = pointsMap[turns.pop().toLowerCase()];

    // ---------------------------- <PART 1> ----------------------------
    // tie
    if (ties.includes(scenario)) {
      matchResults.ties += 1;
      matchResults.opponent.points += 3 + points[opponent];
      matchResults.you.points += 3 + points[points.indexOf(opponent)];
    }
    // you lose
    else if (losses.includes(scenario)) {
      matchResults.opponent.wins += 1;
      matchResults.opponent.points += 6 + points[opponent];
      matchResults.you.points +=
        0 + points[points.indexOf(opponent) - 1] ? points[points.indexOf(opponent) - 1] : points[points.length - 1];
    }
    // you win
    else if (wins.includes(scenario)) {
      matchResults.you.wins += 1;
      matchResults.opponent.points += 0 + points[opponent];
      matchResults.you.points +=
        6 + (points[points.indexOf(opponent) + 1] ? points[points.indexOf(opponent) + 1] : points[0]);
    }
    // ---------------------------- </PART-1> ----------------------------
  });
  matchResults.winner.player = matchResults.you.points > matchResults.opponent.points ? 'you' : 'opponent';
  matchResults.winner.points = matchResults[matchResults.winner.player].points;

  console.log(matchResults);
  console.log(`The winner of part 1 is ${matchResults.winner.player} with ${matchResults.winner.points} points!`);
});
