import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import VideogameCreate from "./components/VideogameCreate/VideogameCreate";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exath path="/home" component={Home} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/videogame" component={VideogameCreate} />
          <Route exact path="/videogame/:id" component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
