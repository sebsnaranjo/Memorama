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
        });
    }

   

    async cargaPantalla(){
        const respuesta = await fetch('');
        console.log(respuesta.json())
    }
}

new Memorama();

