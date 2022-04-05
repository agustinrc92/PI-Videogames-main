import "./App.css";
import { BrowserRouter, browserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import VideogameCreate from "./components/VideogameCreate/VideogameCreate";
import { getDetail } from "./actions";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exath path="/home" component={Home} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/videogame" component={VideogameCreate} />
          <Route exact path="/videogame/:id" component={getDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
