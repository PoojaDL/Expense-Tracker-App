import { useContext } from "react";
import AuthContext from "../../Store/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);
  return console.log(authCtx.token);
};

export default Home;
