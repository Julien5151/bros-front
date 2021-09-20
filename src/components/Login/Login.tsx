import { Button, Card, CardActions, CardContent, TextField, Typography, Link } from "@material-ui/core";
import "./Login.scss";
import logo from "../../assets/images/logo.svg";
import { BaseSyntheticEvent, useState } from "react";
import { useCallback } from "react";
import { ApiService } from "../../services/api.service";
import { useHistory } from "react-router-dom";
import { PROFILE_ROUTE, REGISTER_ROUTE } from "../../App";
import { LocalStorageService } from "../../services/local-storage.service";

export function Login(props: any) {
    const [emailControl, setEmailControl] = useState({ error: false, errorText: null, value: null });
    const [passwordControl, setPasswordControl] = useState({ error: false, errorText: null, value: null });
    const history = useHistory();

    const handleFieldChange = useCallback((event: BaseSyntheticEvent, updateStateFunction: Function) => {
        if (!event.target.value) {
            updateStateFunction({ error: true, errorText: "Required", value: null });
        } else {
            updateStateFunction({ error: false, errorText: null, value: event.target.value });
        }
    }, []);

    const signIn = useCallback(async () => {
        try {
            const body = await ApiService.post("/auth/signin", {
                email: emailControl.value,
                password: passwordControl.value,
            });
            // Save token in local storage
            LocalStorageService.saveState({ token: body.token });
            // Navigate to profile after successfull login
            history.push(PROFILE_ROUTE);
        } catch (error) {
            console.error(error);
        }
    }, [emailControl.value, passwordControl.value, history]);

    const register = useCallback(
        (event: React.SyntheticEvent) => {
            event.preventDefault();
            // Navigate to profile after successfull login
            history.push(REGISTER_ROUTE);
        },
        [history]
    );

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
                        <Typography>
                            Don't have an account ?
                            <span className="register-link">
                                <Link href="#" onClick={register}>
                                    Register now !
                                </Link>
                            </span>
                        </Typography>
                    </form>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={signIn}
                        disabled={emailControl.error || passwordControl.error}
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
