const fs = require("fs");

fs.readFile("test.txt", "utf-8", function (err, contents1) {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Before Trim:");
  console.log(contents1);

  contents1 = contents1.trim(); // ✅ must reassign

  fs.writeFile("test.txt", contents1, function (err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log("File trimmed successfully!");
  });
