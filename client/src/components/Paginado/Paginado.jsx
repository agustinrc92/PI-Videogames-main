import React from "react";
import "./Paginado.css";

export default function Paginado({ videogamesPerPage, videogames, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(videogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div className="number" key={number}>
              <button onClick={() => paginado(number)}>{number}</button>;
            </div>
          ))}
      </ul>
    </nav>
  );
}
