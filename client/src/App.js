import "./App.css";
import { BrowserRouter, browserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import VideogameCreate from "./components/VideogameCreate/VideogameCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exath path="/home" component={Home} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/videogame" component={VideogameCreate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
