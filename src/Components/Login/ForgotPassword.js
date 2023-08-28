import { Button, Form } from "react-bootstrap";
import classes from "./Login.module.css";
import { useRef, Fragment } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ForgotPassword = () => {
  const emailInput = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailInput.current.value,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.status;
            throw new Error(errorMessage);
          });
        }
      })
      .then(() => {
        alert("Check your mail to reset");
      })
      .catch((error) => alert(error));
  };

  return (
    <Fragment>
      <div className={classes.auth}>
        <Form onSubmit={formSubmitHandler} bg="black">
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            aria-required
          >
            <Form.Label>Enter the email with which you registered</Form.Label>
            <Form.Control
              ref={emailInput}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>

          <Button type="submit">Send Link</Button>
          <p>
            Alread a user?<Link to="/Login">Login</Link>
          </p>
        </Form>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
