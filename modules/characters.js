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
      const fetchPage = (page) => {
        fetch(urlRickAndMorty + page)
          .then((response) => response.json())
          .then((data) => {
            const uniqueCharacters = new Set(this.characters.map((char) => char.id));
            
            const newCharacters = data.results.filter((character) => !uniqueCharacters.has(character.id))
              .map((character) => ({
                ...character,
                isFavorite: false,
              }));
    
            this.characters.push(...newCharacters);
    
            if (page < this.totalPages) {
              fetchPage(page + 1);
            }
          })
          .catch((error) => console.error("Error fetching data: ", error));
      };
    
      fetchPage(this.currentPage);
    },
    loadFavoritesFromLocalStorage() {
      const localFavorites = JSON.parse(localStorage.getItem('favorites'));
      if (localFavorites) {
        this.favorites = localFavorites;
      }
    },
    toggleFavorite(character) {
      const favoriteIndex = this.favorites.findIndex((fav) => fav.id === character.id);
      if (favoriteIndex === -1) {
        character.isFavorite = true;
        this.favorites.push(character);
      } else {
        character.isFavorite = false;
        this.favorites.splice(favoriteIndex, 1);
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
    eliminarFavorito(favorite) {
      const index = this.favorites.findIndex(fav => fav.id === favorite.id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
    }
  },
}).mount("#app");
