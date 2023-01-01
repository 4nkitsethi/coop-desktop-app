function currency(value){
    return "₹ "+Number(value).toFixed(2);
}

function scale(value , digits = 3){
    return Number(value).toFixed(digits)
}


export { currency , scale }