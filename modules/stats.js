let urlApiBase = 'https://rickandmortyapi.com/api/'
let personajes = urlApiBase + 'character'
let ubicaciones = urlApiBase + 'location'
let episodios = urlApiBase + 'episode'
const { createApp } = Vue

const app = createApp({
    data() {
        return {
            estadisticasPer: [],
            estadisticasUbica: [],
            estadisticasEpisodes: [],
        }
    },
    created() {
        this.traerDataP(personajes)
        this.traerDataU(ubicaciones)
        this.traerDataE(episodios)
    },
    methods: {
        traerDataP(url) {
            fetch(url).then(responde => responde.json()).then(data => {
                this.estadisticasPer = data
                console.log(this.estadisticasPer);
            })
        },
        traerDataU(url) {
            fetch(url).then(responde => responde.json()).then(data => {
                this.estadisticasUbica = data
                console.log(this.estadisticasUbica);
            })
        },
        traerDataE(url) {
            fetch(url).then(responde => responde.json()).then(data => {
                this.estadisticasEpisodes = data
                console.log(this.estadisticasEpisodes);
            })
        },
        formatoDecimal(value) {
            return value ? value.toFixed(1) : '0.00';
        }
    }




}).mount('#app')