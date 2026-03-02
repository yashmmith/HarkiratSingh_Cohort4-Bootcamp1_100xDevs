let input= 6;
let arr1=[];
for (let i=1;i<input;i++){
  if(input%i===0){
    arr1.push(i);
  }
}
let sum1=0;
for(let k of arr1){
  sum1+=k;
}
if(input==sum1){
  console.log("Yes");
}
else{
  console.log("No");
