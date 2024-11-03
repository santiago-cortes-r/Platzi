// voy a aplicar lo aprendido hasta la clase 6

function operacionesMatematicas(signo, num1, num2){
    
    let x = num1;
    let y = num2;
    var suma = x+y;  
    // if (signo =='=') {
    //     var suma = x+y;        
    // }
    return `${signo} ${suma}`
}

console.log(operacionesMatematicas('=', 2,5));
