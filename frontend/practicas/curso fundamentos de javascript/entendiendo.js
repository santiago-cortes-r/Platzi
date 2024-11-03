class Animal {
    constructor(nombre, tipo) {
        this.nombre = nombre
        this.tipo = tipo
        
    }
    emitirSonido(){
        console.log("el animal suena")
    }
}

class Perro extends Animal {
    constructor(nombre, tipo, raza) {
        super(nombre, tipo)
        this.raza = raza 
    }
    emitirSonido(){
       console.log("el perro ladra") 
    }
    correr(){
        console.log(`${this.nombre}`)
    }
}

