let urlGet = new URL(document.location).searchParams;
let idUrl = urlGet.get('id');
const urlRickAndMorty = "https://rickandmortyapi.com/api/character/"+idUrl;

const { createApp } = Vue

const app = createApp({
    data() {
        return {
            detallesPersonaje: [],
            listaEpisodios: [],
            episodios: ""

        }
    },
    created() {
        this.traerData(urlRickAndMorty)
    },
    methods: {
        traerData(url) {
            fetch(url).then(responde => responde.json()).then(data => {
                this.detallesPersonaje = data
                console.log(this.detallesPersonaje);
                for (const cadena of data.episode) { const ultimoNumero = cadena.match(/\d+$/)[0]; this.listaEpisodios.push(ultimoNumero); }
                this.episodios = this.listaEpisodios.join(', ');
                
                console.log(this.episodios);

                console.log(this.episodios);
            })
        }



    }




}).mount('#app')