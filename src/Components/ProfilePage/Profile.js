import { Fragment, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
// import AuthContext from "../../Store/auth-context";
import NavigationBar from "../NavBar/NavigationBar";
import { useSelector } from "react-redux";

const Profile = () => {
  const [isContent, setContent] = useState("");
  const [userData, setData] = useState(null);
  const nameInput = useRef();
  const imageInput = useRef();
  // const authCtx = useContext(AuthContext);
  // let data = authCtx.token;
  // if (typeof authCtx.token === "string") {
  //   data = JSON.parse(authCtx.token);
  // }

  const authToken = useSelector((state) => state.auth.token);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (nameInput.current.value && imageInput.current.value) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authToken.idToken,
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
        .then(() => {
          setContent("Submitted successfully..! Fetch the details");
        })
        .catch((error) => setContent(error));
    } else {
      setContent("Enter the details");
    }

    setTimeout(() => {
      setContent("");
    }, 3000);
  };

  const fetchData = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authToken.idToken,
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
      .catch((error) => alert(error));
  };

  return (
    <Fragment>
      <NavigationBar />
      <div
        style={{
          width: "60%",
          border: "2px solid black",
          borderRadius: "1.5rem",
        }}
        className="p-5 mx-auto my-5"
      >
        {isContent && (
          <div
            style={{ background: "darkred", color: "white" }}
            className="m-3"
            align="center"
          >
            <p>
              <b>{isContent}</b>
            </p>
          </div>
        )}
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
      </div>

      <div align="center">
        <h1>User Details</h1>
        <Button onClick={fetchData}>fetch user details</Button>
        {userData && (
          <div className="my-5">
            <div
              style={{ height: "100px", width: "100px", background: "grey" }}
            >
              <img
                height="100px"
                width="100px"
                src={userData.photoUrl}
                alt="profile-pic"
              />
            </div>
            <p>
              <b>Name : </b>
              {userData.displayName}
            </p>
            <p>
              <b>Email : </b>
              {userData.email}
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Profile;
