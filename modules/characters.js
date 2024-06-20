const urlRickAndMorty = "https://rickandmortyapi.com/api/character/?page=1";

const { createApp } = Vue;

createApp({
  data() {
    return {
      characters: []
    };
  },
  created() {
    this.traerData(urlRickAndMorty);
  },
  methods: {
    traerData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.characters = data.results;
          console.log(this.characters);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }
}).mount('#app');
