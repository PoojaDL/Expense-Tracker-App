import { Button, Form } from "react-bootstrap";
import { useRef, useState } from "react";

const NewExpenseForm = (props) => {
  const [isNewAdded, setNewItem] = useState("");
  const [showExpense, setShowExpense] = useState(false);
  const expenseInput = useRef();
  const descInput = useRef();
  const categoryInput = useRef();

  const expenseFormSubmit = (event) => {
    event.preventDefault();

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
        setNewItem("Added new expense");
        props.fetchExpenses();
      })
      .catch((error) => props.addNewItem(error));
    setTimeout(() => {
      setNewItem("");
    }, 2000);
  };

  const openExpense = () => {
    setShowExpense(true);
  };

  const closeExpense = () => {
    setShowExpense(false);
  };

  return (
    <div
      style={{
        width: "60%",
        border: "2px solid black",
        borderRadius: "1.5rem",
      }}
      className="p-5 mx-auto my-5"
    >
      {isNewAdded && (
        <div
          style={{ background: "darkred", color: "white" }}
          className="m-3"
          align="center"
        >
          <p>
            <b>{isNewAdded}</b>
          </p>
        </div>
      )}
      {showExpense && (
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
          <div className="pt-5 mx-auto">
            <Button className="me-1 btn-light btn-outline-dark" type="submit">
              Add Expense
            </Button>
            <Button
              className="btn-dark btn-outline-light"
              type="button"
              onClick={closeExpense}
            >
              Close
            </Button>
          </div>
        </Form>
      )}
      {!showExpense && (
        <div align="center">
          <Button className="btn-dark" type="button" onClick={openExpense}>
            Add New Expense
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewExpenseForm;
