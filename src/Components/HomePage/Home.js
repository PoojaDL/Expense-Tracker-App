import { useContext, useState } from "react";
import AuthContext from "../../Store/auth-context";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";

const Home = () => {
  const [content, setContent] = useState("");
  const authCtx = useContext(AuthContext);

  let data = authCtx.token;
  if (typeof authCtx.token === "string") {
    data = JSON.parse(authCtx.token);
  }

  const verifyEmail = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: data.idToken,
          requestType: "VERIFY_EMAIL",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        setContent("Verification code sent successfully");
      } else {
        res.json().then((res) => setContent(res.error.status));
      }
    });
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div>
      <h1 className="d-inline">Welcome to Expense Tracker</h1>
      <Button
        style={{ position: "absolute", right: "10px" }}
        onClick={logoutHandler}
      >
        Logout
      </Button>
      <p>
        Your Profile is inComplete
        <Link to="/Profile">Complete Now</Link>
      </p>
      <Button onClick={verifyEmail}>Verify Email</Button>
      <p>{content}</p>
    </div>
  );
};

export default Home;
