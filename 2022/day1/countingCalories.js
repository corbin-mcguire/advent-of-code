const fs = require('fs');

// Read in and parse the test file
fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  }

  let total = 0;
  let max = 0;
  const totals = [];

  // Split the text file input on newLines
  data.split(/\n/).forEach((entry) => {
    // if not an empty line
    if (entry) {
      total += Number.parseInt(entry);
      // update the max value if the new total is larger
      max = total > max ? total : max;
    }
    // move onto next elf
    else {
      totals.push(total);
      total = 0;
    }
  });

  // sort totals in descending order, take the first 3 entries and add them together
  const topThreeTotal = totals
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((prev, curr) => (prev += curr));
  console.log('Total for top 3 elves:', topThreeTotal);
});
