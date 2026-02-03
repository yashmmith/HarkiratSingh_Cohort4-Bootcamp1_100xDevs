const crypto=require('crypto');
const input="yashmmith";
const hash=crypto.createHash('sha256').update(input).digest('hex');
//console.log(hash);



function findprefix(prefix){
    let input=0;
    while(true){
        let inpstr=input.toString();
        let hash1=crypto.createHash('sha256').update(inpstr).digest('hex');
        if(hash1.startsWith(prefix)){
            return {input :inpstr,hash:hash1};
        }
        input++;
    }
}
const result=findprefix('100xdevs');
console.log(result.input);
console.log(result.hash);

