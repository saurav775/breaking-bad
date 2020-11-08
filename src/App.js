import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Signup, Signin, ForgotPassword, VerifyCode, ResetPassword } from "./components";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/register">
          <Signup title={"Create an account"} id={"signup"} />
        </Route>
        <Route exact path="/login">
          <Signin title={"Welcome to Breaking Bad"} id={"signin"} />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPassword title={"Reset Password"} id={"forgotPassword"} />
        </Route>
        <Route exact path="/verify-code">
          <VerifyCode title={"Verify Code"} id={"verifyCode"} />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword title={"Reset Password"} id={"resetPassword"} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
