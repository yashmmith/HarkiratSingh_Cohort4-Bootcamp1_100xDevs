function stp(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    })
}
async function main(){
    await stp(1000);
    console.log("Hi");
    await stp(3000);
    console.log("Hello");
    await stp(5000);
    console.log("Hellothere");
}