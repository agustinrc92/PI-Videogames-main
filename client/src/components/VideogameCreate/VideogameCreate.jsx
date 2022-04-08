import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./VideogameCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Debes ingresar un nombre";
  } else if (!input.description) {
    errors.description = "Debes ingresar una descripción";
  }
  return errors;
}

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  //BORRAR GENRES AGREGADOS CREANDO EL VIDEOJUEGO
  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== el),
    });
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postVideogame(input));
    alert("VideoJuego Creado");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  //PLATAFORMAS
  const randomPlatforms = [
    "PC",
    "PS4",
    "XBOX",
    "SWITCH",
    "PS3",
    "XBOX ONE",
    "NINTENDO SWITCH",
    "PS2",
    "NINTENDO DS",
    "NINTENDO WII",
    "NINTENDO GAMECUBE",
    "NINTENDO 64",
  ];

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crear Videojuego!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.name && <p classname="error">{errors.name}</p>}
        </div>
        <div>
          <label>Descripcion:</label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.description && <p classname="error">{errors.description}</p>}
        </div>
        <div>
          <label>Fecha de lanzamiento:</label>
          <input
            type="date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="text"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label>Generos</label>
          <select onChange={(e) => handleSelect(e)}>
            {genres.map((genres) => (
              <option key={genres.id} value={genres.id}>
                {genres.name}
              </option>
            ))}
          </select>
          <ul>
            <li>{input.genres.map((el) => el + " ,")}</li>
          </ul>
        </div>
        {input.genres.map((el) => (
          <div className="divGenres">
            <p>{el}</p>
            <button className="botonX" onClick={() => handleDelete(el)}>
              X
            </button>
          </div>
        ))}
        <div>
          <label>Platforms:</label>
          <div>
            {randomPlatforms.map((P) => (
              <div key={P}>
                <input type="checkbox" name="platforms" value={P}></input>
                <label name={P}>{P}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Crear VideoJuego</button>
      </form>
    </div>
  );
}
