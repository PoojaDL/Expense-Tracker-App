// import { Fragment } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/HomePage/Home";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import AuthContext from "./Store/auth-context";
import Profile from "./Components/ProfilePage/Profile";
import ForgotPassword from "./Components/Login/ForgotPassword";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <main>
      <switch>
        {!authCtx.isLoggedIn && (
          <Route path="*">
            <Redirect to="/Login" />
          </Route>
        )}
        <Route path="/">
          {!authCtx.isLoggedIn ? (
            <Redirect to="/Login" />
          ) : (
            <Redirect to="/Home" />
          )}
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/forgotpassword" exact>
            <ForgotPassword />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/Home">
            <Home />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/Profile">
            <Profile />
          </Route>
        )}
      </switch>
    </main>
  );
}

export default App;
