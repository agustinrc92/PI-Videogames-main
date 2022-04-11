import React from "react";
import "./Paginado.css";

export default function Paginado({ videogamesPerPage, videogames, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(videogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav class="pagination">
      {pageNumbers &&
        pageNumbers.map((number) => (
          <div key={number} class="item">
            <button onClick={() => paginado(number)}>{number}</button>;
          </div>
        ))}
    </nav>
  );
}
