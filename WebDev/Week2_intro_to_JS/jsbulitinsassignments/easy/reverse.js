let input= "Hello".split("");
let start=0;
let end=input.length-1;
while(start<=end){
  let temp=input[start];
  input[start]=input[end];
  input[end]=temp;
  start++;
  end--;
}
console.log(input.join(""));
