const fs = require('fs');

// Read in and parse the test file
fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }

  let total = 0;
  const totals = [];

  // Split the text file input on newLines
  data.split(/\n/).forEach((entry) => {
    // if not an empty line
    if (entry) {
      total += Number.parseInt(entry);
    }
    // move onto next elf
    else {
      totals.push(total);
      total = 0;
    }
  });

  // PART 1
  const max = totals.sort((a, b) => b - a);
  console.log('Highest calories for single elf:', max[0]);

  // PART 2
  // sort totals in descending order, take the first 3 entries and add them together
  const topThreeTotal = totals
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((prev, curr) => (prev += curr));
  console.log('Total for top 3 elves:', topThreeTotal);
});
