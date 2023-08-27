import { useContext } from "react";
import AuthContext from "../../Store/auth-context";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <p>
        Your Profile is inComplete
        <Link to="/Profile">Complete Now</Link>
      </p>
    </div>
  );
};

export default Home;
