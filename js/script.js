class Memorama {
    
    constructor() {

        this.totalTarjetas = [];
        this.numeroTarjetas = 0;
        this.verificadorTarjetas = [];
        this.errores = 0;
        this.nivelDificultad = '';
        this.imagenesCorrecatas = [];
        this.agregadorTarjetas = [];

        this.$contenedorTarjetas = document.querySelector('.contenedor-tarjetas');
        this.$contenedorGeneral = document.querySelector('.contenedor-general');
        this.$pantallaBloqueada = document.querySelector('.pantalla-bloqueada');
        this.$mensaje = document.querySelector('h2.mensaje');
        
        //Llamado a los eventos

        this.eventos()
    }

    eventos() {
        window.addEventListener('DOMContentLoaded', () => {
            this.cargaPantalla();
        })
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
                        <img class="tajeta-img" src=${card.src} alt="imagen memorama">
                    </div>`
        })

        this.$contenedorTarjetas.innerHTML = html;

    }
}

new Memorama();

