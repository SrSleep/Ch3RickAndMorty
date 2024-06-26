let urlApiBase = 'https://rickandmortyapi.com/api/'
let urlRickAndMorty = "https://rickandmortyapi.com/api/character/?page=";
let personajes = urlApiBase + 'character'
let ubicaciones = urlApiBase + 'location'
let episodios = urlApiBase + 'episode'
let personajesVivos = personajes + '?status=alive'
let personajesMuertos = personajes + '?status=dead'
let personajesDes = personajes + '?status=unknown'
const { createApp } = Vue

const app = createApp({
    data() {
        return {
            personajes: [],
            estadisticasPer: [],
            estadisticasUbica: [],
            estadisticasEpisodes: [],
            estadisticasPVivos: [],
            estadisticasMuertos: [],
            estadisticasDesconocidos: [],
            currentPage: 1,
            totalPages: 42,
            planetas: [],
        }
    },
    created() {
        this.traerData(personajes, 'estadisticasPer')
        this.traerData(ubicaciones, 'estadisticasUbica')
        this.traerData(episodios, 'estadisticasEpisodes')
        this.traerData(personajesVivos, 'estadisticasPVivos')
        this.traerData(personajesMuertos, 'estadisticasMuertos')
        this.traerData(personajesDes, 'estadisticasDesconocidos')
    },
    methods: {
        traerData(url, variable) {
            fetch(url).then(responde => responde.json()).then(data => {
                this[variable] = data
            })
        },
    }




}).mount('#app')