//#region variables const
const host = "localhost"
const seccionDeAtaque = document.getElementById("ataque")
const botonMascotaJugador = document.getElementById("boton-mascota")



const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionDeMascota = document.getElementById("mascota")


const spanMascotaJugador = document.getElementById("mascotaJugador")

const spanMascotaEnemigo = document.getElementById("mascotaEnemigo")

const contadorVidasJugador = document.getElementById("vidaMascotaJugador")
const contadorVidasEnemigo = document.getElementById("vidaMascotaEnemigo")

const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataqueDelJugador")
const ataqueDelEnemigo = document.getElementById("ataqueDelEnemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

//#endregion

//#region variables let
let jugadorId = null
let enemigoId = null 
let mokepones = []
let mokeponesEnemigos = []

let ataqueEnemigo = []
let opcionDeMokepones

let botonFuego
let botonAgua
let botonTierra

let inputA
let inputB
let inputC

let mascotaJugador
let mascotaDeJuadorObjecto
let ataquesMokepon
let ataquesMokeponEnemigo

let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let nuevoAtaqueConSecuencia = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
let alturQueBuscamos
let anchoDelMapa = window.innerWidth - 100

alturQueBuscamos = anchoDelMapa * 600 / 800
const ALTURA_MAX_MAPA = 400
const ANCHO_MAX_MAPA = 600

if (alturQueBuscamos > ALTURA_MAX_MAPA) {
    alturQueBuscamos = ALTURA_MAX_MAPA
}

if (anchoDelMapa > ANCHO_MAX_MAPA) {
    anchoDelMapa = ANCHO_MAX_MAPA
}


mapa.width = anchoDelMapa
mapa.height = alturQueBuscamos
//#endregion

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(this.mapaFoto, this.x, this.y,
            this.ancho, this.alto)
    }
}
//#region creacion de objetos
let dragon = new Mokepon("dragon", "./imagenes/dragon.webp", 5, './imagenes/cabezaDragon.png')
let monsAcuatico = new Mokepon("monsAcuatico", "./imagenes/marina.webp", 5, './imagenes/movimientoAgua.webp')
let monsTerrestre = new Mokepon("monsTerrestre", "./imagenes/subterraneo.png", 5, './imagenes/movimientoTierra.webp')

// let dragonEnemigo = new Mokepon("dragon", "./imagenes/dragon.webp", 5, './imagenes/cabezaDragon.png')
// let monsAcuaticoEnemigo = new Mokepon("monsAcuatico", "./imagenes/marina.webp", 5, './imagenes/movimientoAgua.webp')
// let monsTerrestreEnemigo = new Mokepon("monsTerrestre", "./imagenes/subterraneo.png", 5, './imagenes/movimientoTierra.webp')



//#endregion

const DRAGON_ATAQUES = [{ nombre: "🔥", id: "boton-fuego" },
{ nombre: "🔥", id: "boton-fuego" },
{ nombre: "🔥", id: "boton-fuego" },
{ nombre: "🌱", id: "boton-tierra" },
{ nombre: "🌱", id: "boton-tierra" },
{ nombre: "💧", id: "boton-agua" }
]
dragon.ataques.push(...DRAGON_ATAQUES)
// dragonEnemigo.ataques.push(...DRAGON_ATAQUES)


const MONSACUATICO_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🔥", id: "boton-fuego" }
]
monsAcuatico.ataques.push(...MONSACUATICO_ATAQUES)
// monsAcuaticoEnemigo.ataques.push(...MONSACUATICO_ATAQUES)


const MONSTERRESTRE_ATAQUES = [{ nombre: "🌱", id: "boton-tierra" },
{ nombre: "🌱", id: "boton-tierra" },
{ nombre: "🌱", id: "boton-tierra" },
{ nombre: "💧", id: "boton-agua" },
{ nombre: "💧", id: "boton-agua" },
{ nombre: "🔥", id: "boton-fuego" }
]
monsTerrestre.ataques.push(...MONSTERRESTRE_ATAQUES)
// monsTerrestreEnemigo.ataques.push(...MONSTERRESTRE_ATAQUES)


mokepones.push(dragon, monsAcuatico, monsTerrestre)

function iniciarJuego() {

    seccionDeAtaque.style.display = "none"
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio"  name="mascota"  id=${mokepon.nombre} />
                <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>    
                </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputA = document.getElementById("dragon")
        inputB = document.getElementById("monsAcuatico")
        inputC = document.getElementById("monsTerrestre")
    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    botonReiniciar.addEventListener("click", reiniciarJuego)
    botonReiniciar.style.display = "none"

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch(`http://${host}:8080/unirse`)
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {

    



    if (inputA.checked) {
        spanMascotaJugador.innerHTML = inputA.id
        mascotaJugador = inputA.id
    } else if (inputB.checked) {
        spanMascotaJugador.innerHTML = inputB.id
        mascotaJugador = inputB.id
    } else if (inputC.checked) {
        spanMascotaJugador.innerHTML = inputC.id
        mascotaJugador = inputC.id
    } else {
        alert("selecciona una opcion")
        return
    }

    seccionDeMascota.style.display = "none"
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()


}
function seleccionarMokepon(mascotaJugador) {
    fetch(`http://${host}:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })

    })
}
function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }

    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques) {

    ataques.forEach((ataque) => {

        ataquesMokepon = `
       <button id="${ataque.id}" class="boton-de-ataque BAtaque">${ataque.nombre}</button>
       `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")


}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                nuevoAtaqueConSecuencia.push("fuego")
                console.log(nuevoAtaqueConSecuencia)
                boton.style.background = "black"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                nuevoAtaqueConSecuencia.push("agua")
                console.log(nuevoAtaqueConSecuencia)
                boton.style.background = "black"
                boton.disabled = true
            } else {
                nuevoAtaqueConSecuencia.push("tierra")
                console.log(nuevoAtaqueConSecuencia)
                boton.style.background = "black"
                boton.disabled = true
            }

            // ataqueAleatorioEnemigo()

            if(nuevoAtaqueConSecuencia.length === 6){
                enviarAtaques()
            }
            
        })
    })

}
function enviarAtaques(){
    fetch(`http://${host}:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: nuevoAtaqueConSecuencia
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://${host}:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({ataques}){
                    if ( ataques.length === 6){
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
        }
    })
}
function seleccionarMascotaEnemigo(enemigo) {

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}
// function ataqueAleatorioEnemigo() {
//     console.log("enemigo " + ataquesMokeponEnemigo);
//     let ataqueAleatorioEnemigo = aleatorio(0, ataquesMokeponEnemigo.length - 1)

//     if (ataqueAleatorioEnemigo == 0 || ataqueAleatorioEnemigo == 1) {
//         ataqueEnemigo.push("fuego")

//     } else if (ataqueAleatorioEnemigo == 2 || ataqueAleatorioEnemigo == 3) {
//         ataqueEnemigo.push("agua")

//     } else {
//         ataqueEnemigo.push("tierra")
//     }
//     console.log(ataqueEnemigo)

//     iniciarPelea()
// }
function iniciarPelea() {
    if (nuevoAtaqueConSecuencia.length === 6) {
        combate()

    }
}
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = nuevoAtaqueConSecuencia[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate() {
    //combate 

    clearInterval(intervalo)

    for (let index = 0; index < nuevoAtaqueConSecuencia.length; index++) {
        if (nuevoAtaqueConSecuencia[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("empate")

        } else if (nuevoAtaqueConSecuencia[index] === "fuego" && ataqueEnemigo[index] === "tierra") {
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
            victoriasJugador++
            contadorVidasJugador.innerHTML = victoriasJugador

        } else if (nuevoAtaqueConSecuencia[index] === "agua" && ataqueEnemigo[index] === "fuego") {
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
            victoriasJugador++
            contadorVidasJugador.innerHTML = victoriasJugador


        } else if (nuevoAtaqueConSecuencia[index] === "tierra" && ataqueEnemigo[index] === "agua") {
            indexAmbosOponentes(index, index)
            crearMensaje("ganaste")
            victoriasJugador++
            contadorVidasJugador.innerHTML = victoriasJugador

        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("perdiste")
            victoriasEnemigo++
            contadorVidasEnemigo.innerHTML = victoriasEnemigo

        }
    }
    revisarVidas()
}
function revisarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("esto fue un empate")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("felicidades ganaste")
    } else { crearMensajeFinal("perdimos") }
}
function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = "ya se acabo el juego " + resultadoFinal

    botonReiniciar.style.display = "block"
}
function reiniciarJuego() {
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function pintarCanvas() {
    switch (mascotaDeJuadorObjecto.nombre) {
        case "dragon":
            mapaBackground.src = './imagenes/zonaBatallaFuego.webp'
            break
        case "monsAcuatico":
            mapaBackground.src = './imagenes/zonaBatallaAgua.webp'
            break
        case "monsTerrestre":
            mapaBackground.src = './imagenes/zonaBatallaTierra.avif'
            break
        default:
            break
    }

    mascotaDeJuadorObjecto.x = mascotaDeJuadorObjecto.x + mascotaDeJuadorObjecto.velocidadX
    mascotaDeJuadorObjecto.y = mascotaDeJuadorObjecto.y + mascotaDeJuadorObjecto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaDeJuadorObjecto.pintarMokepon()

    enviarPosicion(mascotaDeJuadorObjecto.x, mascotaDeJuadorObjecto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

    // // dragonEnemigo.pintarMokepon()
    // // monsAcuaticoEnemigo.pintarMokepon()
    // // monsTerrestreEnemigo.pintarMokepon()

    // if (mascotaDeJuadorObjecto.velocidadX !== 0 || mascotaDeJuadorObjecto.velocidadY !== 0) {
    //     revisarColision(dragonEnemigo)
    //     revisarColision(monsAcuaticoEnemigo)
    //     revisarColision(monsTerrestreEnemigo)

    // }

}

function enviarPosicion(x, y) {
    fetch(`http://${host}:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) {
                        console.log(enemigos)
                        
                        mokeponesEnemigos =  enemigos.map((function(enemigo){
                            let mokeponEnemigo = null 
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if(mokeponNombre === "dragon"){
                                mokeponEnemigo = new Mokepon("dragon", "./imagenes/dragon.webp", 5, './imagenes/cabezaDragon.png', enemigo.id )
                            }else if(mokeponNombre === "monsAcuatico"){
                                mokeponEnemigo = new Mokepon("monsAcuatico", "./imagenes/marina.webp", 5, './imagenes/movimientoAgua.webp', enemigo.id)
                            }else if(mokeponNombre === "monsTerrestre" ){
                                mokeponEnemigo = new Mokepon("monsTerrestre", "./imagenes/subterraneo.png", 5, './imagenes/movimientoTierra.webp', enemigo.id)

                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                            

                            
                            
                        }))
                        
                        
                        


                    })
            }
        })
}

function moverDerecha() {
    mascotaDeJuadorObjecto.velocidadX = 5
}

function moverIzquierda() {
    mascotaDeJuadorObjecto.velocidadX = -5
}
function moverAbajo() {
    mascotaDeJuadorObjecto.velocidadY = 5
}

function moverArriba() {
    mascotaDeJuadorObjecto.velocidadY = -5

}

function detenerMovimiento() {

    mascotaDeJuadorObjecto.velocidadX = 0
    mascotaDeJuadorObjecto.velocidadY = 0
}

function sePresionoUnaTecla(event) {

    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}
function iniciarMapa() {
    // mapa.width = 800
    // mapa.height = 300
    mascotaDeJuadorObjecto = obtenerObjectoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}
function obtenerObjectoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }

    }
}
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaDeJuadorObjecto.y
    const abajoMascota = mascotaDeJuadorObjecto.y + mascotaDeJuadorObjecto.alto
    const derechaMascota = mascotaDeJuadorObjecto.x + mascotaDeJuadorObjecto.ancho
    const izquierdaMascota = mascotaDeJuadorObjecto.x

    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto colision");

    enemigoId = enemigo.id
    sectionVerMapa.style.display = 'none'
    seccionDeAtaque.style.display = "flex"
    seleccionarMascotaEnemigo(enemigo)
}
window.addEventListener("load", iniciarJuego)