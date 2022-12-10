const fs = require("fs");

fs.readFile(`${__dirname}/input.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  }
  const rucksacks = data.split(/\n/);
  const groups = [];
  let alphabet = [];
  let prioritySum = 0;

  // get a list of all upper and lower case letters
  for (let i = 65; i <= 122; i += 1) {
    // skip to lower case ascii values
    if (i === 91) {
      i += 5;
      continue;
    }
    alphabet.push(String.fromCharCode(i));
  }

  // split the alphabet array and place lower case letters first
  alphabet = [...alphabet.splice(alphabet.length / 2), ...alphabet];

  // split the elves into groups of 3
  rucksacks.forEach((rucksack, index) => {
    if ((index + 1) % 3 === 0) {
      groups.push([rucksacks[index - 2], rucksacks[index - 1], rucksack]);
    }
  });

  // PART 1
  // group.forEach((rucksack) => {
  // rucksacks.forEach((rucksack) => {
  //   if (rucksack.length > 0) {
  //     const compartments = rucksack.split("");
  //     const compartmentA = compartments
  //       .splice(0, compartments.length / 2)
  //       .sort()
  //       .reverse();
  //     const compartmentB = [...compartments].sort().reverse();
  //     let priority = 0;
  //     compartmentA.forEach((itemA) => {
  //       compartmentB.find((itemB) => {
  //         if (itemB === itemA) {
  //           priority = alphabet.indexOf(itemA) + 1;
  //         }
  //       });
  //     });
  //     prioritySum += priority;
  //   }
  // });
  // });

  // PART 2
  groups.forEach((group) => {
    let tmpBadge = "";
    let priority = 0;

    group[0].split("").forEach((itemA) => {
      group[1].split("").find((itemB) => {
        if (itemA === itemB) {
          tmpBadge = alphabet[alphabet.indexOf(itemA)];
        }
      });
      group[2].split("").find((itemC) => {
        if (itemC === tmpBadge) {
          priority = alphabet.indexOf(tmpBadge) + 1;
        }
      });
    });
    prioritySum += priority;
  });

  console.log(prioritySum);
});
