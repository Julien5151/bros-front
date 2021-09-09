import "./App.scss";
import { Login } from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";
import { Signup } from "./components/Signup/Signup";

export const PROFILE_ROUTE = "/profile";
export const SIGNUP_ROUTE = "/signup";

function App() {
    return (
        <Router>
            <Switch>
                <Route path={PROFILE_ROUTE}>
                    <Profile />
                </Route>
                <Route path={SIGNUP_ROUTE}>
                    <Signup />
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
