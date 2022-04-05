const initialState = {
  videogames: [],
  genres: [],
  searchVideogame: [],
  createVideogame: null,
  searchVideogameById: [],
  searchVideogameByName: [],
  filteredVideogames: [],
  orderBy: "Select",
  filterBy: "All",
  filteredGames: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "SEARCH_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };

    case "FILTER_BY_GENRE":
      const allVideogames = state.videogames;
      const genreFiltered =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((el) => el.genres.includes(action.payload));
      return {
        ...state,
        videogames: genreFiltered,
      };

    // case "FILTER_CREATED":
    //   const allVideogames2 = state.videogames;
    //   const createdFilter= action.payload === 'created' ? allVideogames2.filter (el=> el.)

    case "POST_VIDEOGAME":
      return {
        ...state,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "desc"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedArr,
      };

    default:
      return state;
  }
}
