import axios from "axios";

//TRAER LOS VIDEOJUEGOS AL FRONT
export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

//TRAER LOS GENEROS
export function getGenres() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/genres", {});
    return dispatch({
      type: "GET_GENRES",
      payload: info.data,
    });
  };
}

//ACCION PARA EL POST (CREATEVIDEOGAME)
export function postVideogame(payload) {
  return async function (dispatch) {
    const response = axios.post("http://localhost:3001/videogame", payload);
    console.log(response);
    return response;
  };
}

//BUSCAR EN LA SEARCHBAR POR NOMBRE
export function searchVideogames(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/videogames?name=" + name
      );
      return dispatch({
        type: "SEARCH_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//FILTRAR POR GENERO
export function filterVideogamesByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

//FILTRAR POR CREADO O DE LA API
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

//ORDENAR ALFABETICAMENTE
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

//DETAIL TRAER VIDEOJUEGO POR ID
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/videogame/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
