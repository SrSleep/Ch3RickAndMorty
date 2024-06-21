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
        console.log("Ejecutando created()...");
        this.traerData();
    },
    methods: {
        traerData() {
            console.log("Ejecutando traerData()...");
            fetch(urlBase)
                .then(response => response.json())
                .then(data => {
                    console.log("Datos obtenidos en traerData():", data.results);
                    this.ubicaciones = data.results;
                });
        },
        filtrarPersonajesPorUbicacion() {
            
            if (!this.filtroUbicacion) {
                this.personajesFiltrados = [];
                console.log("Filtro de ubicación vacío, reiniciando personajesFiltrados.");
                return;
            }

            fetch(`${urlBase}${this.filtroUbicacion}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Datos obtenidos para la ubicación filtrada:", data);
                    return this.obtenerDetallesPersonajes(data.residents);
                })
                .then(residentes => {
                    console.log("Residentes obtenidos:", residentes);
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
            console.log("Ejecutando ubicacionSeleccionada()...");
            return this.ubicaciones.find(ubicacion => ubicacion.id === this.filtroUbicacion);
        },
    },
});

app.mount('#app');