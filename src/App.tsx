import "./App.scss";
import { Login } from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/profile">
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
