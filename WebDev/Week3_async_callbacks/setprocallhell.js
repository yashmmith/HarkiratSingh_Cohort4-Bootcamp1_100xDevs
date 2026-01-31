function stp(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    })
}
stp(1000).then(function(){
    console.log("HI");
})
stp(3000).then(function(){
    console.log("Hello");
})
stp(5000).then(
    function(){
        console.log("Hellothere");
    }
)