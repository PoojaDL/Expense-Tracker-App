// import { Fragment } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/HomePage/Home";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
// import { useContext } from "react";
// import AuthContext from "./Store/auth-context";
import Profile from "./Components/ProfilePage/Profile";
import ForgotPassword from "./Components/Login/ForgotPassword";
import { useSelector } from "react-redux";

function App() {
  const isAuthLogin = useSelector((state) => state.auth.isLoggedIn);
  // const authCtx = useContext(AuthContext);
  // console.log(auth);
  return (
    <main>
      {!isAuthLogin && (
        <Route path="*">
          {!isAuthLogin ? <Redirect to="/Login" /> : <Redirect to="/Home" />}
        </Route>
      )}
      <Route path="/">
        {!isAuthLogin ? <Redirect to="/Login" /> : <Redirect to="/Home" />}
      </Route>
      <Route path="/Login" exact>
        <Login />
      </Route>
      {!isAuthLogin && (
        <Route path="/forgotpassword" exact>
          <ForgotPassword />
        </Route>
      )}
      {isAuthLogin && (
        <Route path="/Home">
          <Home />
        </Route>
      )}
      {isAuthLogin && (
        <Route path="/Profile">
          <Profile />
        </Route>
      )}
    </main>
  );
}

export default App;
