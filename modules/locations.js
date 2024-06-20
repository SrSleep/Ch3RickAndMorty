let urlRick= "https://rickandmortyapi.com/api/character"

const {createApp} = Vue

const app = createApp({

    data(){
        return{
            personajes:[],
            personajesBK:[]
            

        }
    },

    created(){
        this.traerData(urlRick)
        

    },

    methods:{

        traerData(url){
            
            fetch(url).then(response => response.json()).then(data => {
                
                this.personajes = data.results
                
                console.log(this.personajes);
                

                
                

            })
        
        }

    },

    computed:{
        



    }

    
}).mount('#app')



  