const fs=require("fs");
const contents=fs.readFileSync("package.json","utf-8");
console.log(contents)

fs.readFile("package.json","utf-8",function(err,contents1){
  console.log(contents1);
