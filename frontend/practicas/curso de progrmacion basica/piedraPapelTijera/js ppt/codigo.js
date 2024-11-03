
        //1 piedra , 2 papel, 3 tijera
        let jugador = 0
        let pc =0
        let triunfos =0
        let derrotas = 0

       function aleatorio (min,max){
            return Math.floor(Math.random()*(max-min+1)+min)
        }
        function elegir(eleccion){
            let resultado =""
            if(eleccion==1){
                resultado = "piedra"
            }else if(eleccion==2){
                resultado = "papel"
            }else if(eleccion==3){
                resultado = "tijera"
            }
            return resultado
        }
       

        while(triunfos<3 && derrotas<3){

            jugador = prompt("1 piedra , 2 papel, 3 tijera")
            function verificar(jugador){
                if(jugador!=1 && jugador!=2 && jugador!=3){
                jugador = prompt("escoje una ps 1 piedra , 2 papel, 3 tijera")
                }else{jugador=jugador}
             return jugador
            }
            pc = aleatorio(1,3);

            alert("tu " + elegir(verificar(jugador)) )
            alert("pc " + elegir(pc))
            
            //combate 
            if (pc==jugador){
                alert("empate")
            }else if (jugador==1 && pc==3){
                alert("ganaste")
                triunfos+=1
            }else if (jugador==3 && pc ==1){
                alert("ganaste")
                triunfos+=1
            } else{
                alert("perdiste")
                derrotas+=1
            }
        } alert("ganaste "+triunfos+" perdiste "+derrotas)
