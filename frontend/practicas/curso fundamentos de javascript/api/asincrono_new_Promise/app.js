const promise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        let operationSuccessful = true;
        if (operationSuccessful){
            resolve("exito")
        }else{
            reject("fallo")
        }
    }, 2000);
});

promise
    .then((successMessage) => {
        console.log(successMessage)
    })
    .catch((errorMessage) => 
        console.log(errorMessage)
    )