function step3(){
    console.log("Hello There");
};
function step2(){
    console.log("Hello");
    setTimeout(step3,5000);
}
function step1(){
    setTimeout(step2,3000);
}
setTimeout(step1,1000);
