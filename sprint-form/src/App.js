import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  PrivateRoute
} from "react-router-dom";

function App() {
  return (
    <div className="App">
     Hello from App
     <Router>
       <Route exact path="/" component={Login} />
       <PrivateRoute exact path="/recipes" component={Recipes} />
     </Router>
    </div>
  );
}

export default App;
