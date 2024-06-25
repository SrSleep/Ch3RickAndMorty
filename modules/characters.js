const urlRickAndMorty = "https://rickandmortyapi.com/api/character/?page=";

const { createApp } = Vue;

createApp({
  data() {
    return {
      characters: [],
      currentPage: 1,
      totalPages: 42,
      searchText: '',
      currentStatusFilter: '',
      currentSpeciesFilter: '',
      currentGenderFilter: ''
    };
  },
  created() {
    this.fetchAllCharacters();
  },
  computed: {
    filteredCharacters() {
      let filteredCharacters = this.characters;

      if (this.currentStatusFilter) {
        filteredCharacters = filteredCharacters.filter(character => character.status === this.currentStatusFilter);
      }
      if (this.currentSpeciesFilter) {
        filteredCharacters = filteredCharacters.filter(character => character.species === this.currentSpeciesFilter);
      }
      if (this.currentGenderFilter) {
        filteredCharacters = filteredCharacters.filter(character => character.gender === this.currentGenderFilter);
      }

      if (this.searchText) {
        filteredCharacters = filteredCharacters.filter(character =>
          character.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }

      return filteredCharacters;
    }
  },
  methods: {
    fetchAllCharacters() {
      this.fetchData(this.currentPage);
    },
    fetchData(page) {
      fetch(urlRickAndMorty + page)
        .then(response => response.json())
        .then(data => {

          this.characters = this.characters.concat(data.results);


          if (page < this.totalPages) {
            this.fetchData(page + 1);
          }
          
        })
        .catch(error => console.error('Error fetching data:', error));
    },
    
    searchInput() {
    },

    filterByStatus(status) {
      this.currentStatusFilter = status;
    },
    filterBySpecies(species) {
      this.currentSpeciesFilter = species;
    },
    filterByGender(gender) {
      this.currentGenderFilter = gender;
    }
  }
}).mount('#app');
