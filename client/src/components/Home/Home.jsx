import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../actions";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div>
      <Link to="/videogame">Crear Videojuego</Link>
      <h1>Videogames Center</h1>
      <div>
        <select>
          <option value="asc">Rating Ascendente</option>
          <option value="desc">Rating Descendente</option>
        </select>
        <select>
          <option value="All">Todos</option>
          <option value="Api">Existente</option>
          <option value="Created">Creado</option>
        </select>
        <select>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

        {videogames &&
          videogames.map((el) => {
            <Card name={el.name} image={el.image} genre={el.genre} />;
            return (
              <div>
                <Card name={el.name} image={el.image} genre={el.genre} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
