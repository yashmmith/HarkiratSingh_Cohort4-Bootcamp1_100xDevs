const fs=require('fs');
function readfie(path,cb){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,'utf-8',function(err,data){
            if(err){
                reject("error");
            }
            else{
                resolve(data);
            }
        })
    })
};
function ondone(data){
    console.log(data);
}
function err(error){
    console.log(error);
}
readfile("a.txt").then(ondone).catch(err);