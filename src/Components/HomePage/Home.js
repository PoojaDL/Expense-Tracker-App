import { Fragment, useCallback, useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";
import NavigationBar from "../NavBar/NavigationBar";
import styles from "./Home.module.css";
import NewExpenseForm from "./NewExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expense-context";

const Home = () => {
  const themeRef = useRef();
  // const [theme,setTheme]=useState("0")
  const [content, setContent] = useState("");
  const [AllContent, setOtherContent] = useState("");
  const [expenseList, setExpenses] = useState([]);
  let premiumNeeded = false;

  const authToken = useSelector((state) => state.auth.token);
  const authId = authToken.idToken;

  const dispatch = useDispatch();

  const totalExpensesCost = useSelector((state) => state.expense.totalCost);
  if (totalExpensesCost >= 10000) {
    premiumNeeded = true;
  } else {
    premiumNeeded = false;
  }

  const verifyEmail = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authId,
          requestType: "VERIFY_EMAIL",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        setContent(
          "Verification code sent successfully, Check your mail and verify"
        );
      } else {
        res.json().then((res) => {
          console.log(res.error);
          return setContent(res.error.message);
        });
      }
      setTimeout(() => {
        setContent("");
      }, 3000);
    });
  };

  const fetchExpenses = useCallback(() => {
    fetch(
      "https://expenses-list-34d5f-default-rtdb.firebaseio.com/expenses.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const items = [];
        let totalCost = 0;
        for (const key in data) {
          const fetchedData = {
            key: key,
            expense: data[key].expense,
            description: data[key].description,
            category: data[key].category,
          };
          totalCost += +data[key].expense;
          items.unshift(fetchedData);
        }
        setExpenses(items);
        dispatch(expenseActions.addExpense(items));
        dispatch(expenseActions.countTotal(totalCost));
      });
  }, [dispatch]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const extraContent = (content) => {
    setOtherContent(content);
    setTimeout(() => {
      setOtherContent("");
    }, 2000);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Fragment>
      {console.log(themeRef)}
      <div style={{ background: "darkgrey" }}>
        <NavigationBar />
        <div className={styles["main-div"]}>
          <div>
            <span aria-hidden="true">light</span>
            <input
              style={{ width: "50px" }}
              type="range"
              min="0"
              max="1"
              id="choice"
              ref={themeRef}
              onChange={changeHandler}
            />
            <span aria-hidden="true">dark</span>
          </div>
          <h1 className="py-4 px-2">Welcome to Expense Tracker</h1>
          <p>
            Your Profile is inComplete <Link to="/Profile">Complete Now</Link>
          </p>
          <p
            style={{
              background: "#42224B",
              margin: "2% 10%",
              color: "white",
            }}
          >
            {content}
          </p>
          <Button onClick={verifyEmail}>Verify Email</Button>
          {premiumNeeded && (
            <Button
              className="btn-danger d-block mx-auto my-3"
              onClick={verifyEmail}
            >
              Activate Premium
            </Button>
          )}
        </div>

        <NewExpenseForm
          fetchExpenses={fetchExpenses}
          addNewItem={extraContent}
        />
        {extraContent && (
          <div
            style={{ background: "darkred", color: "white" }}
            className="m-3"
            align="center"
          >
            <p>
              <b>{AllContent}</b>
            </p>
          </div>
        )}

        <div align="center">
          {expenseList.length > 0 && (
            <ul className="p-0">
              {expenseList.map((item) => (
                <ExpenseItem
                  key={item.key}
                  id={item.key}
                  expense={item.expense}
                  description={item.description}
                  category={item.category}
                  callfunction={fetchExpenses}
                  onAnyChange={extraContent}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
