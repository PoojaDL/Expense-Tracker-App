import { Fragment, useContext, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import AuthContext from "../../Store/auth-context";

const Profile = () => {
  const [userData, setData] = useState(null);
  const nameInput = useRef();
  const imageInput = useRef();
  const authCtx = useContext(AuthContext);
  let data = authCtx.token;
  if (typeof authCtx.token === "string") {
    data = JSON.parse(authCtx.token);
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: data.idToken,
          displayName: nameInput.current.value,
          photoUrl: imageInput.current.value,
          returnSecureToken: true,
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
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchData = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: data.idToken,
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
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setData(data.users[0]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <Form onSubmit={formSubmitHandler} bg="black">
        <h1>Contact details</h1>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
          aria-required
        >
          <Form.Label>Full Name</Form.Label>
          <Form.Control ref={nameInput} type="text" />
        </Form.Group>
        <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            https://example.com/users/
          </InputGroup.Text>
          <Form.Control
            ref={imageInput}
            id="basic-url"
            aria-describedby="basic-addon3"
          />
        </InputGroup>

        <Button type="submit">Submit</Button>
      </Form>

      <h1>User Details</h1>
      <Button onClick={fetchData}>fetch user details</Button>
      {userData && (
        <ul>
          <li>{`Name: ${userData.displayName}`}</li>
          <li>{`email: ${userData.email}`}</li>
          <li>{`image: ${userData.photoUrl}`}</li>
        </ul>
      )}
    </Fragment>
  );
};

export default Profile;
