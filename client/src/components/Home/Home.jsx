import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenres,
  filterVideogamesByGenre,
  orderByName,
  filterCreated,
} from "../../actions";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const [orden, setOrden] = useState("");
  const genres = useSelector((state) => state.genres);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideoGames = videogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  //FUNCION PARA FILTRAR POR GENERO
  function handleFilterGenres(e) {
    console.log("a");
    dispatch(filterVideogamesByGenre(e.target.value));
    console.log(e.target.value);
  }

  //FUNCION PARA UTILIZAR EL FILTRO DE ORDENAR AZ
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  //FUNCION PARA FILTRAR POR CREADO O API
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div>
      <Link to="/videogame">Crear Videojuego</Link>
      <h1>Videogames Center</h1>
      <div>
        <select>
          <option value="asc">Rating Ascendente</option>
          <option value="desc">Rating Descendente</option>
        </select>
        <select onChange={(e) => handleFilterGenres(e)}>
          <option value="All">Todos</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">Todos</option>
          <option value="creados">Creado</option>
          <option value="existente">Existente</option>
        </select>
        <div>
          <select onChange={(e) => handleSort(e)}>
            <option value="desc">A-Z</option>
            <option value="asc">Z-A</option>
          </select>
          <SearchBar />
          <nav>
            <Paginado
              videogamesPerPage={videogamesPerPage}
              videogames={videogames.length}
              paginado={paginado}
            />
          </nav>
        </div>

        {currentVideoGames &&
          currentVideoGames.map((el) => {
            <Card name={el.name} image={el.image} genre={el.genres} />;
            return (
              <fragment>
                <Card name={el.name} image={el.image} genre={el.genres} />
                <Link to={`videogame/${el.id}`}>
                  <button>Detalles</button>
                </Link>
              </fragment>
            );
          })}
      </div>
    </div>
  );
}
