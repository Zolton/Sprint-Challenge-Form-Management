import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import FormikLoginForm from "./components/UserFiles/Login";
import Login from "./components/UserFiles/Login";
import PrivateRoute from "./components/Security/PrivateRoute";
import Recipes from "./components/UserFiles/Recipes";

function App() {
  return (
    <div className="App">
     Hello from App
     <Router>
       <Link exact to="/">Home</Link>
       <Link exact to="/recipes">Recipes</Link>
       <Route exact path="/" component={Login} />
       <PrivateRoute exact path="/recipes" component={Recipes} />
     </Router>
    </div>
  );
}

export default App;
