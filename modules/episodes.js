let urlRickAndMorty = "https://rickandmortyapi.com/api/episode?page=";

const { createApp } = Vue;

const app = createApp({

    data() {
        return {
            productos: [],
            productosBK:[],
            temporadas: [],
            filtroTexto: "",
            categoriasSeleccionadas: [],
            paginas: 3,
        }
    },
    created() {
        this.traerData(urlRickAndMorty)
    },
    methods: {
        traerData(url, url2, url3) {
            fetch(url, url2, url3)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.productos = data.results;
                    this.productosBK = data.results;
                    console.log(this.productos);
                    this.temporadas = Array.from(new Set(this.productos.map((product) => product.episode.slice(0, 3))))
                    console.log(this.temporadas);
                })
        }
    },
    computed: {
        superFiltro() {
            let filtroText = this.productosBK.filter(producto => producto.name.toLowerCase().includes(this.filtroTexto.toLowerCase()))
            this.productos = filtroText
            
        }
    },

}).mount('#app')