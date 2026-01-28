function countvowels(vov){
    let v1=['a','e','i','o','u'];
    let s=[];
    for (let k of vov){
        if (v1.includes(k.toLowerCase())){
            s.push(k);
        }
    }
    console.log(s);
}
countvowels(['f','a','t']);