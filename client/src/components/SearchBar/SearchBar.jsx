import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogames } from "../../actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function handleImputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchVideogames(name));
  }

  return (
    <div>
      <input
        class="barras2"
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleImputChange(e)}
      ></input>
      <button
        class="buttonSearchBar"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}
