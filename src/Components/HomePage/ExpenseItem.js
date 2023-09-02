import { Button, Col, Row } from "react-bootstrap";
import UpdateForm from "./UpdateForm";
import { Fragment, useState } from "react";
import classes from "./ExpenseItem.module.css";

const ExpenseItem = (props) => {
  const [item, setItem] = useState(null);
  const [isOpen, setUpdateForm] = useState(false);

  const updateItem = () => {
    setUpdateForm(true);
    const data = {
      id: props.id,
      expense: props.expense,
      description: props.description,
      category: props.category,
    };
    setItem(data);
  };

  const removeItem = () => {
    fetch(
      `https://expenses-list-34d5f-default-rtdb.firebaseio.com/expenses/${props.id}.json`,
      { method: "delete" }
    ).then((res) => {
      if (res.ok) {
        props.onAnyChange("Item deleted successfully");
        props.callfunction();
      } else {
        return res.json().then((data) => {
          props.onAnyChange(data.error.message);
        });
      }
    });
  };

  const closeUpdateForm = () => {
    setUpdateForm(false);
  };

  return (
    <Fragment>
      <Row className={classes.items}>
        <Col sm={7}>
          <Row>
            <Col xm={6} className={`d-block ${classes.price}`}>
              <h2 className="py-3">₹{props.expense}</h2>
            </Col>
            <Col xm={6} className="py-2">
              <p className={classes.description}>{props.description}</p>
              <p className="p-0 m-0">{props.category}</p>
            </Col>
          </Row>
        </Col>
        <Col sm={5} className="py-3">
          <Button className="btn-sm btn-light" onClick={updateItem}>
            <img
              width="30px"
              src="https://cdn-icons-png.flaticon.com/128/7798/7798765.png"
              alt="delete-png"
            ></img>
          </Button>{" "}
          {item && isOpen && (
            <UpdateForm
              className={classes.updateForm}
              data={item}
              callfunction={props.callfunction}
              onAnyChange={props.onAnyChange}
              closeBtn={closeUpdateForm}
            />
          )}
          <Button className="btn-sm btn-light" onClick={removeItem}>
            <img
              width="30px"
              src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png"
              alt="delete-png"
            ></img>
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ExpenseItem;
