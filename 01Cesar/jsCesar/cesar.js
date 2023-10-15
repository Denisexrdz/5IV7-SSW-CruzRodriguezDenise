const desplazamiento= document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCrifado = document.getElementById("cifrado");

//vamos a crear funcion para poder cifrar
function cifrado(){
    //declarar el texto que se va a ingresar
    const textoIngresado = texto.value;
    textoCifrado.value = textoIngresado.split('').map(c=> {    
            let mayus = (c === c.toUpperCase()) ? true : false;  //operador terniario para deshacerse de los numeros 
            let valoEntero = c.toLowerCase().charCodeAt(0);
            if(valoEntero >= 97 && valoEntero <= 122){ // la A empieza en el 97 por codigo ascii    si voy a cifrrar el desplazamiento es positivo, si vas a decifrar el desplazamiento es negativo
                const valorDesplazamiento = parseInt (desplazamiento.value);

                //obteniendo el valor del desplazamiento 

                if (valorEntero + valorDesplazamiento > 122){
                    valorEntero = 97 + (valoEntero - 122)+
                    valorDesplazamiento - 1;
                } else{
                    valorEntero = valorEntero + valorDesplazamiento;
                }

            }
            let cifrado= String.fromCharCode(valoEntero);
            return mayus ? cifrado.toUpperCase() : cifrado;
        })  .join(''); //para unir carcteres en una funcion 


     //funciones flecha =>
}

texto.addEventListener("keyup" ,cifrado );
desplazamiento.addEventListener("change" , cifrado);