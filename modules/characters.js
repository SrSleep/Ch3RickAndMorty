const urlRickAndMorty = "https://rickandmortyapi.com/api/character/?page=";

const { createApp } = Vue;

createApp({
  data() {
    return {
      characters: [],
      currentPage: 1,
      totalPages: 42,
      searchText: "",
      currentStatusFilter: "",
      currentSpeciesFilter: "",
      currentGenderFilter: "",
      favorites: [],
    };
  },
  created() {
    this.fetchCharacters();
    this.loadFavoritesFromLocalStorage();
  },
  computed: {
    filteredCharacters() {
      let filteredCharacters = this.characters;

      if (this.currentStatusFilter) {
        filteredCharacters = filteredCharacters.filter(
          (character) => character.status === this.currentStatusFilter
        );
      }
      if (this.currentSpeciesFilter) {
        filteredCharacters = filteredCharacters.filter(
          (character) => character.species === this.currentSpeciesFilter
        );
      }
      if (this.currentGenderFilter) {
        filteredCharacters = filteredCharacters.filter(
          (character) => character.gender === this.currentGenderFilter
        );
      }

      if (this.searchText) {
        filteredCharacters = filteredCharacters.filter((character) =>
          character.name.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }

      return filteredCharacters;
    },
  },
  methods: {
    fetchCharacters() {
      fetch(urlRickAndMorty + this.currentPage)
        .then((response) => response.json())
        .then((data) => {
          const resultsWithFavorites = data.results.map((character) => ({
            ...character,
            isFavorite: false,
          }));
          this.characters = this.characters.concat(resultsWithFavorites);
          if (data.info.next) {
            this.fetchCharacters(); // Llamar recursivamente para obtener más personajes
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    },
    loadFavoritesFromLocalStorage() {
      const localFavorites = JSON.parse(localStorage.getItem('favorites'));
      if (localFavorites) {
        this.favorites = localFavorites;
      }
    },
    toggleFavorite(character) {
      character.isFavorite = !character.isFavorite;
      if (character.isFavorite) {
        this.favorites.push(character);
      } else {
        this.favorites = this.favorites.filter((fav) => fav.id !== character.id);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    filterByStatus(status) {
      this.currentStatusFilter = status;
    },
    filterBySpecies(species) {
      this.currentSpeciesFilter = species;
    },
    filterByGender(gender) {
      this.currentGenderFilter = gender;
    },
    openFavoritesModal() {
      const favoritesModal = new bootstrap.Modal(
        document.getElementById("favoritesModal")
      );
      favoritesModal.show();
    },
    eliminarFavorito(favorite){
      this.favorites.splice(favorite,1) 
      console.log(favorite);
      localStorage.setItem('favorites',JSON.stringify(this.favorites))
  }
  },
}).mount("#app");
