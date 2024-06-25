let urlApiBase = 'https://rickandmortyapi.com/api/'
let personajes = urlApiBase + 'character'
let filtro = 'https://rickandmortyapi.com/api/character'

const {createApp} = Vue

const app = createApp({
    data() {
        return{
            personajesPrincipales:[],
        }
    },
    created() {
        this.traerData(personajes)
    },
    methods: {
        traerData(url) {
            fetch(url).then(responde => responde.json()).then(data => {
                this.personajesPrincipales = data.results.slice(0,5);
                console.log(this.personajesPrincipales)
            })
        }
    }




}).mount('#app')