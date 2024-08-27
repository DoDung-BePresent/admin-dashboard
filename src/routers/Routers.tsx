import { useDispatch, useSelector } from "react-redux";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { authSelector, AuthState } from "../redux/reducers/authReducer";

const Routers = () => {
  const auth: AuthState = useSelector(authSelector);

  const dispatch = useDispatch();

  return !auth.token ? <AuthRouter /> : <MainRouter />;
};

export default Routers;
