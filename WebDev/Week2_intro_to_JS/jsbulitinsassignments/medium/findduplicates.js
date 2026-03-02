let input= [10, 20, 30, 10, 40];
let output= [];
for(let a of input){
  let count=0;
  for (let b of input){
    if (a==b){
      count++;
    }
  }
  if (count==2){
    output.push(a);
  }
}
console.log(output);
