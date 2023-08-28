import { Fragment, useContext, useRef, useState } from "react";
import AuthContext from "../../Store/auth-context";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Form } from "react-bootstrap";

const Home = () => {
  const [content, setContent] = useState("");
  const [expenseList, setExpenses] = useState([]);
  const authCtx = useContext(AuthContext);

  const expenseInput = useRef();
  const descInput = useRef();
  const categoryInput = useRef();

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

  const expenseFormSubmit = (event) => {
    event.preventDefault();

    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        {
          expense: expenseInput.current.value,
          description: descInput.current.value,
          category: categoryInput.current.value,
        },
      ];
    });

    console.log(expenseList);
  };

  return (
    <Fragment>
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

      <div>
        <Form onSubmit={expenseFormSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Expense</Form.Label>
            <Form.Control type="number" ref={expenseInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={descInput} />
          </Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" ref={categoryInput}>
            <option value="Petrol">Petrol</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
          </Form.Select>

          <Button type="submit">Add Expense</Button>
        </Form>
      </div>

      <div>
        {expenseList.length > 0 && (
          <ul>
            {expenseList.map((item) => (
              <li>
                {`${item.expense} - ${item.description} - ${item.category}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
