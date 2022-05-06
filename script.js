/*Diego Paolo Morales Lopez ML20011
  Edwin Daniel Lizama Garcia LG20012 */

//html collections de los circulos (discos) y los contenedores (columnas)
const circulos = document.querySelectorAll('.circulo'); 
const containters = document.querySelectorAll('.columna');

//bandera para revisar si el movimiento del jugador es legal durante el dragover
var flag = false

//ciclo foreach para añadir a cada disco las funciones de dragstart y dragend
circulos.forEach(circulo => {
    /*añade la clase agarrando, que baja la opacidad del bloque a 0 y
     ayuda a identificar el dato que se agarró con jquery*/
    circulo.addEventListener('dragstart', () => {
        circulo.classList.add('agarrando')
    })
    //elimina la clase agarrando del objeto arrastrado
    circulo.addEventListener('dragend', () => {
        circulo.classList.remove('agarrando')
    })
})

//ciclo foreach para añadir a cada columna las funciones mouseover, dragover y drop
containters.forEach(columna => {
    /*funcion que se activa cuando el mouse toca una columna, para hacer los
     discos que tengan un disco encima inutilizables*/
    columna.addEventListener('mouseover', e => {
            let hijos = columna.children;
            for (let index = 0; index < hijos.length; index++) {
                if (index === hijos.length - 1) {
                    hijos.item(index).setAttribute("draggable", "true")
                } else {
                    hijos.item(index).setAttribute("draggable", "false")
                }
            }
        })
    /*Funcion que se ejecuta cuando un elemento se arrastra encima de una torre, verifica
    que el movimiento del jugador sea legal y activa o desactiva una boolean flag segun el movimiento
     */
    columna.addEventListener('dragover', e => {
        e.preventDefault()
        let agarrado = document.querySelector('.agarrando')
        const numero = columna.childElementCount;

        let hijos = columna.children;
        let num = hijos.length - 1;
        let numAgarrado = parseInt(agarrado.innerHTML) //numero del disco agarrado
        var numPrimerDisc = 0 //numero del primer disco de la columna
        if (numero !== 0) {
            numPrimerDisc = parseInt(hijos.item(num).innerText)
        }
        //hace una verificacion en base al numero del objeto agarrado y el numero del primer disco de la columna
        if (numAgarrado < numPrimerDisc || numero == 0) {

            flag = true
        } else if (numAgarrado > numPrimerDisc && numPrimerDisc !== 0 ) {
            flag = false
        }
        
    })
    /*Funcion que verifica la bandera de la funcion de dragover y apendiza el objeto agarrado
    o no dependiendo de si la bandera es verdadera o falsa
     */
    columna.addEventListener('drop', e => {
        let agarrado = document.querySelector('.agarrando') //obtiene el dato agarrado
        let flag2 = false;
        
        if(columna===agarrado.parentNode){
            //verifica si el objeto se agarro y se intento colocar sobre la misma columna en la que se encontraba
            flag2 = true
        }
        const n = columna.childElementCount; //obtiene el numero de hijos de la columna
            if (flag&&flag2==false) { //si el movimiento fue legal y no fue a la misma columna
                columna.appendChild(agarrado) //coloca el objeto agarrado dentro de la columna
                /*segun el numero de hijos de la columna, le otorga una cantidad de pixeles distinta
                a la propiedad top, para modificar la posicion absoluta del disco y asi simular que el disco cae
                hasta el fondo de la columna
                 */
                if (n === 0) {
                    agarrado.style.top = "125px"
                }
                if (n === 1) {
                    agarrado.style.top = "100px"
                } else if (n === 2) {
                    agarrado.style.top = "75px"
                } else if (n === 3) {
                    agarrado.style.top = "50px"
                } else if (n === 4) {
                    agarrado.style.top = "25px"
                }
            }
            else if(flag&&flag2==true){//si el movimiento es legal y sobre la misma columna
                console.log("mismo");
            }
            else if(flag==false&&flag2==true){
                //si el movimiento es legal pero se intento realizar un movimiento no permitido y regresa a la misma columna
                //este if es unicamente para evitar realizar una alerta de error cuando el movimiento fue legal
                console.log("mismo");
            }
            else {//mensaje de error en caso de que el movimiento sea ilegal
                alert("No se puede colocar un disco mas grande sobre uno pequeño!")
                
            }
        })
})