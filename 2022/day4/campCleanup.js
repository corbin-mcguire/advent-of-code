const fs = require("fs");

fs.readFile(`${__dirname}/test.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const pairs = data.split("\n").filter((entry) => entry);

  let containingPairs = 0;
  pairs.forEach((assignment) => {
    const [start1, end1, start2, end2] = assignment.split(/\D/g).map((entry) => Number.parseInt(entry));

    if ((start1 >= start2 && start1 <= end2) || (start2 >= start1 && start2 <= end1)) {
      containingPairs += 1;
    }
  });
  console.log(containingPairs);
});
