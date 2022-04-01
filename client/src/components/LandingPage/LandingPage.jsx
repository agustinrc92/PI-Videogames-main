import react from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Bienvenidos a VideoJuegos by Agustin</h1>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
