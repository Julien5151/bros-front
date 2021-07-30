import { Button, Card, CardActions, CardContent, TextField } from "@material-ui/core";
import "./Login.scss";
import logo from "../assets/images/001-beer.svg";

export function Login(props: any) {
    return (
        <div className="login-component">
            <Card className="form">
                <CardContent className="content">
                    <div className="logo-wrapper">
                        <img src={logo} alt="bros and beers logo"></img>
                    </div>
                    <TextField className="input" label="Email" variant="outlined" />
                    <TextField className="input" label="Password" variant="outlined" />
                </CardContent>
                <CardActions className="actions">
                    <Button variant="contained" color="primary">
                        Sign-in
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
