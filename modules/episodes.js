let urlRickAndMorty = "https://rickandmortyapi.com/api/episode?page=";

const { createApp } = Vue;

const app = createApp({

    data() {
        return {
            episodes: [],
            episodesBK: [],
            temporadas: [],
            filtroTexto: "",
            temporadaSeleccionadas: [],
            page: 1,
            totalPages:[],
            ids: []
        }
    },
    created() {
        this.paginado()
    },
    methods: {
        traerData(page) {
            fetch(urlRickAndMorty + page)
                .then(response => response.json())
                .then((data) => {
                    
                    this.totalPages = data.info.pages

                    this.episodes = this.episodes.concat(data.results)

                    this.episodesBK = this.episodesBK.concat(data.results)

                    this.temporadas = Array.from(new Set(this.episodes.map((product) => product.episode.slice(1, 3))))

                    if (page < this.totalPages) {
                        this.traerData(page + 1);
                    }

                    this.ids = this.episodes.map(element => element.id);
                    
                })
        },
        paginado() {
            this.traerData(this.page);
            console.log(this.ids);
        }
    },
    computed: {
        superFiltro() {
            let filtroText = this.episodesBK.filter(producto => producto.name.toLowerCase().includes(this.filtroTexto.toLowerCase()))
            if (this.temporadaSeleccionadas.length > 0) {
                this.episodes = filtroText.filter(producto => this.temporadaSeleccionadas.includes(producto.episode.slice(1, 3)))
            } else {
                this.episodes = filtroText
            }
        }
    }
}).mount('#app')