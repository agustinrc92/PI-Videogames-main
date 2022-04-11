import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myVideogame = useSelector((state) => state.detail);
  console.log(myVideogame);

  return (
    <div>
      {Object.entries(myVideogame).length > 0 ? (
        <div>
          <h1 class="color">{myVideogame.name}</h1>
          <img
            src={myVideogame.img ? myVideogame.img : myVideogame.image}
            alt=""
            width="300px"
            height="250px"
          />
          <h2 class="color">
            Genero:{" "}
            {!myVideogame.createdInDb
              ? myVideogame.genres + " "
              : myVideogame.genres.map((el) => el.name + " ")}
          </h2>
          <p class="color">
            Descripcion: {myVideogame.description.replace(/(<([^>]+)>)/gi, "")}
          </p>
          <p class="color">Fecha de Lanzamiento: {myVideogame.released}</p>
          <p class="color">Rating: {myVideogame.rating}</p>
          <p class="color">
            Plataformas:{" "}
            {!myVideogame.createdInDb
              ? myVideogame.platforms + " "
              : myVideogame.platforms.map((el) => el.name + " ")}
          </p>
        </div>
      ) : (
        <p>Loading..</p>
      )}
      <Link to="/home">
        <button class="buttonDetalles">Volver</button>
      </Link>
    </div>
  );
}
