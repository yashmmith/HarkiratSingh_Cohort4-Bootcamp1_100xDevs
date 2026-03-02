
function callbackify(){
	rerturn new Promise((resolve,reject)=>{
		setTimeout(resolve,0);
	}
}
 function callback(){
console.log('function sucessfully called');
}
callbackify().then(callback);
