import NavBar from "./components/Navbar";
import Travellogger from "./components/Travellogger";
import Travel from "./components/Travel";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Travellogger} />
        <Route exact path="/travel" component={Travel} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
