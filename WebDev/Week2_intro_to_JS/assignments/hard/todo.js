class todo{
    constructor(array1){
        this.array1=array1;
    }
    add(ad1){
        this.array1.push(ad1);
    }
    remove(rm1){
        this.array1.pop(rm1);
    }
    display(){
        console.log(this.array1);
    }
}
let Todo=new todo();
Todo.add("Eat");
Todo.add("Hello");
Todo.display();