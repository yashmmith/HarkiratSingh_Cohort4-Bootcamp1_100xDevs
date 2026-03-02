let output= [];
for(let i=1;i<=100;i++){
  let count=0;
  for(let j=1;j<=i;j++){
    if(i%j==0){
      count++;
    }
  }
  if(count===2){
    output.push(i);
  }
}
console.log(output);
