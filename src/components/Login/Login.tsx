import { Button, Card, CardActions, CardContent, TextField } from "@material-ui/core";
import "./Login.scss";
import logo from "../../assets/images/logo.svg";
import { BaseSyntheticEvent, useState } from "react";
import { useCallback } from "react";
import { post } from "../../services/api.service";

export function Login(props: any) {
    const [emailControl, setEmailControl] = useState({ error: false, errorText: null, value: null });
    const [passwordControl, setPasswordControl] = useState({ error: false, errorText: null, value: null });

    const handleFieldChange = useCallback((event: BaseSyntheticEvent, updateStateFunction: Function) => {
        if (!event.target.value) {
            updateStateFunction({ error: true, errorText: "Required", value: null });
        } else {
            updateStateFunction({ error: false, errorText: null, value: event.target.value });
        }
    }, []);

    const signIn = useCallback(async () => {
        const token = await post("https://bros-back-end.herokuapp.com/auth/signin", {
            email: emailControl.value,
            password: passwordControl.value,
        });
        console.log(token);
    }, [emailControl.value, passwordControl.value]);

    return (
        <div className="login-component">
            <Card>
                <CardContent>
                    <div className="logo-wrapper">
                        <img src={logo} alt="bros and beers logo"></img>
                    </div>
                    <form autoComplete="off">
                        <TextField
                            onChange={(event: BaseSyntheticEvent) => handleFieldChange(event, setEmailControl)}
                            error={emailControl.error}
                            helperText={emailControl.errorText}
                            label="Email"
                            variant="outlined"
                        />
                        <TextField
                            onChange={(event: BaseSyntheticEvent) => handleFieldChange(event, setPasswordControl)}
                            type="password"
                            error={passwordControl.error}
                            helperText={passwordControl.errorText}
                            label="Password"
                            variant="outlined"
                        />
                    </form>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={signIn}
                        disabled={emailControl.error || passwordControl.error}
                        variant="contained"
                        color="primary"
                    >
                        Sign-in
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
