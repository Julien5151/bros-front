import "./App.scss";
import { Login } from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";

export const PROFILE_ROUTE = "/profile";

function App() {
    return (
        <Router>
            <Switch>
                <Route path={PROFILE_ROUTE}>
                    <Profile />
                </Route>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
