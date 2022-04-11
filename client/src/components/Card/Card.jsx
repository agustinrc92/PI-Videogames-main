import React from "react";
import "./Card.css";

export default function Card({ name, image, genre }) {
  return (
    <div class="card">
      <div class="textCard">
        <div class="nameGenres">
          <div class="name">{name}</div>
          <div class="genres">{genre.join(", ")}.</div>
        </div>
      </div>
      <img class="img" src={image} alt="No se encuentra imagen" />
    </div>
  );
}
