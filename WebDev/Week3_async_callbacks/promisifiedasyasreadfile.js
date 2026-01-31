const fs=require('fs');
function readfie(path,cb){
    return new Promise((resolve)=>{
        fs.readFile(path,'utf-8',function(err,data){
            data=data.trim();
            fs.writeFile(path,data,function(){
                resolve();
            })
        })
    })
};
async function main(){
    await readfile("a.txt");
    console.log("done reading the file")
}
main();