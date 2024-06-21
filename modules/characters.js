const urlRickAndMorty = "https://rickandmortyapi.com/api/character/?page=";

        const { createApp } = Vue;

        createApp({
            data() {
                return {
                    characters: [],
                    currentPage: 1,
                    totalPages: 42
                };
            },
            created() {
                this.fetchData(this.currentPage);
            },
            methods: {
                fetchData(page) {
                    fetch(urlRickAndMorty + page)
                        .then(response => response.json())
                        .then(data => {
                            this.characters = data.results;
                            console.log(this.characters);
                            console.log(urlRickAndMorty + page); 
                            
                        })
                        .catch(error => console.error('Error fetching data:', error));
                },
                nextPage() {
                    if (this.currentPage < this.totalPages) {
                        this.currentPage++;
                        this.fetchData(this.currentPage);
                    }
                },
                prevPage() {
                    if (this.currentPage > 1) {
                        this.currentPage--;
                        this.fetchData(this.currentPage);
                    }
                }
            }
        }).mount('#app');