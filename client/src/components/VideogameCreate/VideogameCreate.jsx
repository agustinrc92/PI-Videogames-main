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
    "PS2",
    "PS3",
    "PS4",
    "XBOX",
    "SWITCH",
    "XBOX ONE",
    "NINTENDO DS",
    "NINTENDO 64",
    "NINTENDO WII",
    "NINTENDO SWITCH",
    "NINTENDO GAMECUBE",
  ];

  return (
    <div class="container">
      <Link to="/home">
        <button class="button2">Volver</button>
      </Link>
      <h1 class="creavg">CREA TU VIDEOJUEGO!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>NOMBRE:</label>
          <input
            class="label"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>DESCRIPCION:</label>
          <input
            class="label"
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label>FECHA DE LANZAMIENTO:</label>
          <input
            class="label"
            type="date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label>RATING:</label>
          <input
            class="label"
            type="text"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div>
          <label>GENEROS</label>
          <select class="label" onChange={(e) => handleSelect(e)}>
            {genres.map((genres) => (
              <option key={genres.id} value={genres.name}>
                {genres.name}
              </option>
            ))}
          </select>
          <ul>
            <li>{input.genres.map((el) => el + " ,")}</li>
          </ul>
        </div>
        {input.genres.map((el) => (
          <div>
            <p>{el}</p>
            <button class="button" onClick={() => handleDelete(el)}>
              X
            </button>
          </div>
        ))}
        <div class="checks">
          <label>PLATAFORMAS:</label>
          <div>
            {randomPlatforms.map((P) => (
              <div key={P}>
                <input type="checkbox" name="platforms" value={P}></input>
                <label name={P}>{P}</label>
              </div>
            ))}
          </div>
        </div>
        <button class="button1" type="submit">
          Crear VideoJuego
        </button>
      </form>
    </div>
  );
}
