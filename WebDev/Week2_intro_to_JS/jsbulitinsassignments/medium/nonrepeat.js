let input= "abcdef";
let output= [];
for(let a of input){
  let count=0;
  for (let b of input){
    if (a==b){
      count++;
    }
  }
  if (count==1){
    output.push(a);
    break;
  }
}
