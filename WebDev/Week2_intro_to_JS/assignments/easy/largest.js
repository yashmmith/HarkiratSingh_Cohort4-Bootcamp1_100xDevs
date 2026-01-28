function largestelefromarr(arr1){
    let ans=-10000000;
    for(let k of arr1){
        if (k>ans) ans=k;
    }
    console.log(ans);
}
largestelefromarr([10,2,3,4,5]);