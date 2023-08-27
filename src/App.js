// import { Fragment } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/HomePage/Home";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <main>
      <switch>
        <Route path="*">
          <Redirect to="/Login" />
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
      </switch>
    </main>
  );
}

export default App;
