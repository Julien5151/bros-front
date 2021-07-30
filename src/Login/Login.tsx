import { Button, Card, CardActions, CardContent, TextField } from "@material-ui/core";
import "./Login.scss";
import logo from "../assets/images/001-beer.svg";

export function Login(props: any) {
    return (
        <div className="login-component">
            <Card>
                <CardContent>
                    <div className="logo-wrapper">
                        <img src={logo} alt="bros and beers logo"></img>
                    </div>
                    <TextField label="Email" variant="outlined" />
                    <TextField label="Password" variant="outlined" />
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary">
                        Sign-in
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
