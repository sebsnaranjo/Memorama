class Memorama {
    
    constructor() {

        this.totalTarjetas = [];
        this.numeroTarjetas = 0;
        this.verificadorTarjetas = [];
        this.errores = 0;
        this.nivelDificultad = '';
        this.imagenesCorrecatas = [];
        this.agregadorTarjetas = [];
        this.numeroIntentos = 0;

        this.$contenedorTarjetas = document.querySelector('.contenedor-tarjetas');
        this.$contenedorGeneral = document.querySelector('.contenedor-general');
        this.$pantallaBloqueada = document.querySelector('.pantalla-bloqueada');
        this.$mensaje = document.querySelector('h2.mensaje');
        this.$errorContenedor = document.createElement('div');
        this.$nivelDificultad = document.createElement('div');
        //Llamado a los eventos

        this.eventos()
    }

    eventos() {
        window.addEventListener('DOMContentLoaded', () => {
            this.seleccionDificultad();
            this.cargaPantalla();
        })
    }

    seleccionDificultad() {
        const mensaje = prompt('Selecciona el nivel de dificultad: fácil, intermedio o dificil. Si no seleccionas ningún nivel por defecto el nivel será intermedio');

        if(!mensaje) {
            this.numeroIntentos = 5;
            this.nivelDificultad = 'Intermedio';
        } else {
            if(mensaje.toLowerCase() === 'facil' || mensaje.toLowerCase() === 'fácil') {
                this.numeroIntentos = 7;
                this.nivelDificultad = 'Fácil';
            } else if (mensaje.toLowerCase() === 'intermedio'){
                this.numeroIntentos = 5;
                this.nivelDificultad = 'Intermedio';
            } else if (mensaje.toLowerCase() === 'dificil' || mensaje.toLowerCase() === 'difícil') {
                this.numeroIntentos = 3;
                this.nivelDificultad = 'Difícil';
            } else {
                this.numeroIntentos = 5;
                this.nivelDificultad = 'Intermedio';
            }
        }
        
        this.contenedorError();
        this.mensajeIntentos();

    }


    async cargaPantalla() {
        const respuesta = await fetch('../memo.json');
        const data = await respuesta.json();
        this.totalTarjetas = data;
        if (this.totalTarjetas.length > 0 ) {
            this.totalTarjetas.sort(orden);
            //organizacion de forma aleatoria
            function orden(a,b) {
                return Math.random() - 0.5;
            }
        }

        this.numeroTarjetas = this.totalTarjetas.length;


        let html = '';
        this.totalTarjetas.forEach(card => {
            html += `<div class="tarjeta">
                        <img class="tarjeta-img" src=${card.src} alt="imagen memorama">
                    </div>`
        })

        this.$contenedorTarjetas.innerHTML = html;
        this.comienzaJuego();
    }

    comienzaJuego() {
        const tarjetas = document.querySelectorAll('.tarjeta');
        tarjetas.forEach(tarjeta => {
            tarjeta.addEventListener('click', e => {
                this.clickTarjeta(e)
            })
        })
    }

    clickTarjeta(e) {
        this.efectoVoltearTarjeta(e);
        let sourceImage = e.target.childNodes[1].attributes[1].value; //Permite saber el src 
        this.verificadorTarjetas.push(sourceImage);
        let tarjeta = e.target;
        this.agregadorTarjetas.unshift(tarjeta);
        this.comparadorTarjetas();
    }

    efectoVoltearTarjeta(e) {
        e.target.style.backgroundImage = 'none';
        e.target.style.backgroundColor =  'white';
        e.target.childNodes[1].style.display = 'block';
    }
    
    fijarParAcertado(arregloTarjetasAcertadas) {
        arregloTarjetasAcertadas.forEach(tarjeta => {
            tarjeta.classList.add('acertada');
            this.imagenesCorrecatas.push(tarjeta);
            this.victoriaJuego();
        })
    }

    reversoTarjetas(arregloTarjetas) {
        arregloTarjetas.forEach(tarjeta => {
            setTimeout(() => {
                tarjeta.style.backgroundImage = 'url(../img/cover.jpg)';
                tarjeta.childNodes[1].style.display = 'none';
            }, 1000);
        })
    }

    comparadorTarjetas() {
        if (this.verificadorTarjetas.length == 2) {
            if(this.verificadorTarjetas[0] == this.verificadorTarjetas[1]){
                this.fijarParAcertado(this.agregadorTarjetas);
            } else {
                this.reversoTarjetas(this.agregadorTarjetas);
                this.errores++;
                this.incrementadorError();
                this.derrotaJuego();
            }
            this.verificadorTarjetas.splice(0);
            this.agregadorTarjetas.splice(0);
        }
    }

    victoriaJuego() {
        if(this.imagenesCorrecatas.length == this.numeroTarjetas){
            setTimeout(() => {
                this.$pantallaBloqueada.style.display = 'block';
                this.$mensaje.innerText = '¡Felicidades haz ganado el juegos!';
            }, 1000);
            setTimeout(() => {
                location.reload()
            }, 4000);
        }
    }

    derrotaJuego() {
        if (this.errores === this.numeroIntentos) {
            setTimeout(() => {
                this.$pantallaBloqueada.style.display = 'block';
            }, 1000);
            setTimeout(() => {
                location.reload();
            }, 4000);
        }
    }

    incrementadorError() {
        this.$errorContenedor.innerText = `Errores: ${this.errores}`;
    }

    contenedorError() {
        this.$errorContenedor.classList.add('error');
        this.incrementadorError();
        this.$contenedorGeneral.appendChild(this.$errorContenedor);
    }

    mensajeIntentos() {
        this.$nivelDificultad.classList.add('nivel-dificultad');
        this.$nivelDificultad.innerHTML = `Nivel de dificultad: ${this.nivelDificultad}`
        this.$contenedorGeneral.appendChild(this.$nivelDificultad);
    }
}

new Memorama();

