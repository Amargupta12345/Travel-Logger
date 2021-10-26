import Travellogger from "./components/TraveLLoger/Travellogger";
import Travel from "./components/Main/Travel";
import FindLocation from "./components/FindLocation/FindLocation";
import NotFound from "./components/Main/NotFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Travellogger} />
        <Route exact path="/travel" component={Travel} />
        <Route exact path="/location" component={FindLocation} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
