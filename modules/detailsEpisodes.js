let url = new URL(document.location).searchParams
let urlId = url.get('value');
let urlRickAndMorty = "https://rickandmortyapi.com/api/episode/" + urlId;

const { createApp } = Vue

const app = createApp({
    data() {
        return {
            producto: [],
            personajes: [],
            filtrados: []
        }
    },
    created() {
        this.traerData()
    },
    methods: {
        traerData() {
            fetch(urlRickAndMorty)
                .then(response => response.json())
                .then((data) => {
                    this.producto = data
                    this.personajes = data.characters
                    this.personajes.forEach(element => {
                        fetch(element)
                            .then(response => response.json())
                            .then((data) => {
                                this.filtrados = this.filtrados.concat(data)
                            })
                    });
                })
        }
    },
    computed: {
    }
}).mount('#app')