function clctime(n){
    let d1=new Date();
    let ans=0;
    for(let i=0;i<n;i++){
        ans=ans+i;
    }
    let d2=new Date();
    return d2-d1;
}
console.log(clctime(1000));
