import React from "react";
import "./App.css";
import { createStore } from "redux";
import Search from "./routes/search";
import Hospitals from "./routes/hospitals";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

let store = createStore(reducer);

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
