function calcandreturnex(transactions){
    const totals={};
    for(let k of transactions){
        const{category,price}=k;
        if (totals[category]) {
            totals[category] += price;
        } else {
            totals[category] = price;
        }
    }
    const result = [];
    for (let category in totals) {
        result.push({ [category]: totals[category] });
    }

    return result;
}
console.log(calcandreturnex([
    {
  itemName: "Apple",
  category: "Food",
  price: 30,
  timestamp: 123456789
}
]));
