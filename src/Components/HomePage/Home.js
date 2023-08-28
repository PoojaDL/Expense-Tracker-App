import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AuthContext from "../../Store/auth-context";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Form } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";

const Home = () => {
  const [content, setContent] = useState("");
  const [expenseList, setExpenses] = useState([]);
  // let expensesList=[];
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

  const expenseFormSubmit = (event, id) => {
    event.preventDefault();
    console.log(true, id);

    const dataEntered = {
      expense: expenseInput.current.value,
      description: descInput.current.value,
      category: categoryInput.current.value,
    };

    fetch(
      "https://expenses-list-34d5f-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(dataEntered),
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
        fetchExpenses();
      })
      .catch((error) => alert(error));
  };

  const fetchExpenses = useCallback(() => {
    fetch(
      "https://expenses-list-34d5f-default-rtdb.firebaseio.com/expenses.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const items = [];
        for (const key in data) {
          const fetchedData = {
            key: key,
            expense: data[key].expense,
            description: data[key].description,
            category: data[key].category,
          };
          items.push(fetchedData);
        }
        setExpenses(items);
      });
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const updateExpenses = (data) => {
    console.log(data);
    expenseInput.current.value = data.expense;
    descInput.current.value = data.description;
    categoryInput.current.value = data.category;
    expenseFormSubmit(true, data.id);
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
              <ExpenseItem
                key={item.key}
                id={item.key}
                expense={item.expense}
                description={item.description}
                category={item.category}
                callfunction={fetchExpenses}
                update={updateExpenses}
              />
            ))}
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
