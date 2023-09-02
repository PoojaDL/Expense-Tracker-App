import { useRef } from "react";
import { Form, Button } from "react-bootstrap";

const UpdateForm = (props) => {
  const expenseInput = useRef();
  const descInput = useRef();
  const categoryInput = useRef();

  const closeForm = () => {
    props.closeBtn();
  };

  const expenseFormUpdate = (event) => {
    event.preventDefault();

    const dataEntered = {
      expense: expenseInput.current.value,
      description: descInput.current.value,
      category: categoryInput.current.value,
    };

    fetch(
      `https://expenses-list-34d5f-default-rtdb.firebaseio.com/expenses/${props.data.id}.json`,
      {
        method: "PUT",
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
        props.onAnyChange("Updated successfully");
        props.callfunction();
        props.closeBtn();
      })
      .catch((error) => props.onAnyChange(error));
  };

  return (
    <div
      align="left"
      style={{
        background: "#ddc7bb",
        position: "absolute",
        color: "black",
        borderRadius: "1rem",
      }}
      className="p-4 m-3"
    >
      <Form onSubmit={expenseFormUpdate}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Expense</Form.Label>
          <Form.Control
            type="number"
            defaultValue={props.data.expense}
            ref={expenseInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            defaultValue={props.data.description}
            ref={descInput}
          />
        </Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select
          aria-label="Default select example"
          defaultValue={props.data.category}
          ref={categoryInput}
        >
          <option value="Petrol">Petrol</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
        </Form.Select>
        <div className="p-2">
          <Button className="me-2 btn-dark" type="submit">
            Update Expense
          </Button>
          <Button className="btn-danger" type="button" onClick={closeForm}>
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateForm;
