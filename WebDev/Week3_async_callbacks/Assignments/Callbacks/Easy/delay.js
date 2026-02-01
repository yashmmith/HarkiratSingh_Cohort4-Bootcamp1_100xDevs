function delay(ms, value) {
  return new Promise((resolve)=>{
    setTimeout(resolve(value), ms);
  })
}

function main(value){
  console.log(value);
}

delay(3000,"Function called").then(main);
