const fs = require("fs");

const content = "Some content!";

fs.writeFile("package.json", content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.readFile("package.json", "utf-8", (err, contents2) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(contents2);
  });
