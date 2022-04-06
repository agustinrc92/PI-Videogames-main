import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myVideogame = useSelector((state) => state.detail);

  return (
    <div>
      {Object.entries(myVideogame).length > 0 ? (
        <div>
          <h1>Esto es {myVideogame.name}</h1>
          <img
            src={myVideogame.img ? myVideogame.img : myVideogame.image}
            alt=""
            width="500px"
            height="700px"
          />
          <h2>
            Genero:{" "}
            {!myVideogame.createdInDb
              ? myVideogame.genre + " "
              : myVideogame.genres.map((el) => el.name + " ")}
          </h2>
          <h2>
            Plataforma:{" "}
            {!myVideogame.createdInDb
              ? myVideogame.platform + " "
              : myVideogame.platforms.map((el) => el.name + " ")}
          </h2>
          <p>Descripcion: {myVideogame.description}</p>
          <p>Fecha de Lanzamiento: {myVideogame.released}</p>
          <p>Rating: {myVideogame.rating}</p>
        </div>
      ) : (
        <p>Loading..</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
