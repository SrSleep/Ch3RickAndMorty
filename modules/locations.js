let urlBase = "https://rickandmortyapi.com/api/location/";

const app = Vue.createApp({
    data() {
        return {
            ubicaciones: [],
            filtroUbicacion: '',
            personajesFiltrados: [],
        };
    },
    created() {
        
        this.traerData();
    },
    methods: {
        traerData() {
           
            fetch(urlBase)
                .then(response => response.json())
                .then(data => {
                    
                    this.ubicaciones = data.results;
                });
        },
        filtrarPersonajesPorUbicacion() {
            
            if (!this.filtroUbicacion) {
                this.personajesFiltrados = [];
                
                return;
            }

            fetch(`${urlBase}${this.filtroUbicacion}`)
                .then(response => response.json())
                .then(data => {
                   
                    return this.obtenerDetallesPersonajes(data.residents);
                })
                .then(residentes => {
                   
                    this.personajesFiltrados = residentes;
                });
        },
        obtenerDetallesPersonajes(residentes) {
            
            const detallesPromesas = residentes.map(url => fetch(url).then(response => response.json()));
            return Promise.all(detallesPromesas);
        },
    },
    computed: {
        ubicacionSeleccionada() {
            
            return this.ubicaciones.find(ubicacion => ubicacion.id === this.filtroUbicacion);
        },
    },
});

app.mount('#app');