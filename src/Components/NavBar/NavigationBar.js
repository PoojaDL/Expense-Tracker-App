import { Fragment } from "react";
import { Container, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import styles from "./NavBar.module.css";

// import AuthContext from "../../Store/auth-context";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-reducer";

const NavigationBar = () => {
  const dispatch = useDispatch();
  // const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    // authCtx.logout();
    dispatch(authActions.logout());
  };

  return (
    <Fragment>
      <Navbar className={styles.nav}>
        <Container>
          <Navbar.Brand to="/Home">
            <img
              alt="brandLogo"
              src="https://assets.materialup.com/uploads/c2b5ecb4-ccae-4d53-b0fb-117058776fb4/preview.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <p className="d-inline text-white">Expense Tracker</p>
          </Navbar.Brand>
        </Container>

        <Button
          className={`${styles.logoutBtn} btn-outline-light`}
          style={{ background: "#ddc7bb", color: "black" }}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </Navbar>
    </Fragment>
  );
};

export default NavigationBar;
