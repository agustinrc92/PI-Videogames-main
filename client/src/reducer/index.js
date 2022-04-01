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
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
  }
}
