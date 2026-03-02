let input=[10, 20, 30, 10, 40, 20];
let output=[];
for (let a of input){
  if(output.includes(a)){
    continue
  }
  else{
    output.push(a);
  }
}
console.log(output);

