let urlGet = new URL(document.location).searchParams;
let idUrl = urlGet.get('id');
const urlRickAndMorty = "https://rickandmortyapi.com/api/character/" + idUrl;

const { createApp } = Vue

const app = createApp({
    data() {
        return {
            detallesPersonaje: [],
            listaEpisodios: [],
            temporada1: [],
            temporada2: [],
            temporada3: [],
            temporada4: [],
            temporada5: [],

        }
    },
    created() {
        this.traerData(urlRickAndMorty)
    },
    methods: {
        traerData(url) {
            fetch(url)
                .then(responde => responde.json())
                .then(data => {
                    this.detallesPersonaje = data
                    this.listaEpisodios = this.detallesPersonaje.episode.map(url => fetch(url).then(responde => responde.json()));
                    Promise.all(this.listaEpisodios)
                    .then(data =>{
                        this.listaEpisodios = data
                        this.temporada1 = data.filter(ep => ep.episode.startsWith('S01'))
                        this.temporada2 = data.filter(ep => ep.episode.startsWith('S02'))
                        this.temporada3 = data.filter(ep => ep.episode.startsWith('S03'))
                        this.temporada4 = data.filter(ep => ep.episode.startsWith('S04'))
                        this.temporada5 = data.filter(ep => ep.episode.startsWith('S05'))
                    })
                })
        }



    }




}).mount('#app')