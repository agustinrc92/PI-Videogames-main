import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

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
          <label>Generos:</label>
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
        <div>
          <label>Plataformas:</label>
          <select multiple value={input.platforms} name="platforms">
            <option value="1">PC</option>
            <option value="2">PlayStation 4</option>
            <option value="3">Xbox One</option>
            <option value="4">Nintendo Switch</option>
            <option value="5">Nintendo 3DS</option>
            <option value="6">Nintendo Wii U</option>
            <option value="7">Nintendo DS</option>
            <option value="8">Nintendo 3DS XL</option>
            <option value="9">Nintendo Wii</option>
            <option value="10">Nintendo GameCube</option>
            <option value="11">Nintendo 64</option>
            <option value="12">Nintendo Game</option>
          </select>
        </div>
        <button type="submit">Crear VideoJuego</button>
      </form>
    </div>
  );
}
