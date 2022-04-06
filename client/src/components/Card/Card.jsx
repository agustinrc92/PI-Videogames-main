import React from "react";
import "./Card.css";

export default function Card({ name, image, genre }) {
  return (
    <div>
      <h3>{name}</h3>
      <h5>{genre}</h5>
      <img src={image} alt="Img not found" width="200px" height="250px" />
    </div>
  );
}
