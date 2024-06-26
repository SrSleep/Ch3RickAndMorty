const urlBase = "https://rickandmortyapi.com/api/location/";

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

            fetch(`${urlBase}?page=1`)
                .then(response => response.json())
                .then(data => {
                    console.log("Datos de la página 1:", data);
                    this.ubicaciones = data.results
                    let totalPages = data.info.pages;

                    if (totalPages > 1) {
                        const ubicacionesPagina = [];
                        for (let page = 2; page <= totalPages; page++) {
                            
                            const url = `${urlBase}?page=${page}`;  

                            ubicacionesPagina.push(fetch(url).then(response => response.json()));
                        }

                        Promise.all(ubicacionesPagina)
                            .then(pagesData => {
                                pagesData.forEach(page => {
                                    console.log("datos del resto de paginas", page);
                                    this.ubicaciones.push(...page.results);
                                });
                            });
                    }
                });
        },

        filtrarPersonajesPorUbicacion() {

            if (!this.filtroUbicacion) {
                this.personajesFiltrados = [];

                return;
            }
            
            const datosUbicacionUrl = `${urlBase}${this.filtroUbicacion}`;

            fetch(datosUbicacionUrl)
                .then(response => response.json())
                .then(data => {
                    console.log("Datos de la ubicación:", data);

                    let residentesUrls = data.residents;
                    return this.obtenerDetallesPersonajes(residentesUrls);
                })
                .then(residentesDetalles => {
                    console.log("Detalles de residentes :", residentesDetalles);
                    this.personajesFiltrados = residentesDetalles;


                });
        },

        obtenerDetallesPersonajes(residentesUrls) {


            let detallesPromesas = residentesUrls.map(url => fetch(url).then(response => response.json()));
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

