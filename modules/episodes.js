let urlRickAndMorty = "https://rickandmortyapi.com/api/episode";

const { createApp } = Vue;

const app = createApp({

    data(){
        return{
            productos: [],
            categorias:[],
            texto:"",
            categoriasSeleccionadas:[]
        }
    },
    created(){
        this.traerData(urlRickAndMorty)
    },
    methods:{
        traerData(url){
            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                this.productos = data.results
            })
        }
    },
    computed:{

    },

}).mount('#app')