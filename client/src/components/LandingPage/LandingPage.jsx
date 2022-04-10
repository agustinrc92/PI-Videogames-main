import react from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <body class="body">
      <div>
        <h1 class="h1">Proyecto Videogames</h1>
        <h1 class="h1">Agustin Rodriguez</h1>
        <Link to="/home">
          <button class="button">Ingresar</button>
        </Link>
      </div>
    </body>
  );
}
