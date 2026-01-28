class calculator{
    constructor(no1,no2){
        this.no1=no1;
        this.no2=no2;
    }
    add(){
        return this.no1+this.no2;
    }
    sub(){
        return this.no1-this.no2;
    }
    mul(){
        return this.no1*this.no2;
    }
    div(){
        return this.no1/this.no2;
    }
}
let s=new calculator(1,2)
console.log(s.add());
console.log(s.sub());
console.log(s.mul());
console.log(s.div());