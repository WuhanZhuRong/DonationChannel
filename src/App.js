import React from "react";
import "./App.css";
import Search from "./routes/search";
import Home from "./routes/home";
import Hospitals from "./routes/hospitals";
import Detail from "./routes/detail";
import Record from "./routes/record";
import DemandsMap from "./routes/demandsMap";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/hospitals/:id" component={Detail} />
          <Route path="/hospitals" component={Hospitals} />
          <Route path="/search" component={Search} />
          <Route path="/record/:id" component={Record} />
          <Route path="/:tab" component={Home} />
          <Route path="/" component={Home} />
          <Route path="/demandsMap" component={DemandsMap} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
