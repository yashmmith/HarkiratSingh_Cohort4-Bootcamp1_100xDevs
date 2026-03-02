let input= [1, 2, 3, 1, 2, 1]
let result={}
for (let i=0;i<input.length;i++){
  let char1=input[i];
  if(result[char1]){
    result[char1]++;
  }
  else{result[char1]=1}
}
console.log(result);
