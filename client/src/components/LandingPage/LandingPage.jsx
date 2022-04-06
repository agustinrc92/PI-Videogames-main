import react from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <h1>Proyecto Videogames</h1>
      <h1>Agustin Rodriguez</h1>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
