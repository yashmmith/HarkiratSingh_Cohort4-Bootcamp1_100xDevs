function settimeoutpromisified(ms){
    return new promise((resolve)=>{
        setTimeout(resolve,ms);
    })
}
function callback(){
    console.log("called function");
}
settimeoutpromisified(3000).then(callback);