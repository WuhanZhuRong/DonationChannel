import React from "react";
import "./App.css";
import Search from "./routes/search";
import Hospitals from "./routes/hospitals";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/hospitals" component={Hospitals} />
          <Route path="/" component={Search}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
