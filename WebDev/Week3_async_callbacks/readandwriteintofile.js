const fs=require('fs');
function editfile(path,cd){
    fs.readfile(path,'utf-8',function(err,data){
        data=data.trim();
        fs.writeFile(path,data,function(){
            cd();
        })
    })
}
function ondone(){
    console.log("done with the task");
};
editfile("a.txt",ondone);