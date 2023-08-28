import { Button } from "react-bootstrap";

const ExpenseItem = (props) => {
  const updateItem = () => {
    const data = {
      id: props.id,
      expense: props.expense,
      description: props.description,
      category: props.category,
    };
    props.update(data);
  };

  const removeItem = () => {
    fetch(
      `https://expenses-list-34d5f-default-rtdb.firebaseio.com/expenses/${props.id}.json`,
      { method: "delete" }
    ).then((res) => {
      if (res.ok) {
        alert("Item deleted successfully");
        props.callfunction();
      } else {
        return res.json().then((data) => {
          alert(data.error.message);
        });
      }
    });
  };

  return (
    <li>
      {`${props.expense} - ${props.description} - ${props.category}`}
      <Button className="btn-sm" onClick={updateItem}>
        Update
      </Button>{" "}
      <Button className="btn-sm btn-danger" onClick={removeItem}>
        Remove
      </Button>
    </li>
  );
};

export default ExpenseItem;
