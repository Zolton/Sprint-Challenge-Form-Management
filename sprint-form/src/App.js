import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/UserFiles/Login";
import PrivateRoute from "./components/Security/PrivateRoute";
import Recipes from "./components/UserFiles/Recipes";

function App() {
  return (
    <div className="App">
      <Router>
        <Link exact to="/">
          <h6>Home</h6>
        </Link>
        <Link exact to="/recipes">
        <h6>Recipes</h6>
        </Link>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/recipes" component={Recipes} />
      </Router>
    </div>
  );
}

export default App;
