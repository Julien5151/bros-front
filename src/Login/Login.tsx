import { Button, Card, CardActions, CardContent, TextField } from "@material-ui/core";
import "./Login.scss";
import logo from "../assets/images/logo.svg";
import { BaseSyntheticEvent, useState } from "react";
import { useCallback } from "react";

export function Login(props: any) {
    const [emailError, setEmailError] = useState({ error: false, errorText: "" });
    const [passwordError, setPasswordError] = useState({ error: false, errorText: "" });

    const handleFieldChange = useCallback((event: BaseSyntheticEvent, updateStateFunction: Function) => {
        if (!event.target.value) {
            updateStateFunction({ error: true, errorText: "Required" });
        } else {
            updateStateFunction({ error: false, errorText: "" });
        }
    }, []);

    return (
        <div className="login-component">
            <Card>
                <CardContent>
                    <div className="logo-wrapper">
                        <img src={logo} alt="bros and beers logo"></img>
                    </div>
                    <form autoComplete="off">
                        <TextField
                            onChange={(event: BaseSyntheticEvent) => handleFieldChange(event, setEmailError)}
                            error={emailError.error}
                            helperText={emailError.errorText}
                            label="Email"
                            variant="outlined"
                        />
                        <TextField
                            onChange={(event: BaseSyntheticEvent) => handleFieldChange(event, setPasswordError)}
                            type="password"
                            error={passwordError.error}
                            helperText={passwordError.errorText}
                            label="Password"
                            variant="outlined"
                        />
                    </form>
                </CardContent>
                <CardActions>
                    <Button disabled={emailError.error || passwordError.error} variant="contained" color="primary">
                        Sign-in
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
