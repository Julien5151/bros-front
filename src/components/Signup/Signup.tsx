import { Button, Card, CardActions, CardContent, TextField } from "@material-ui/core";
import "./Signup.scss";
import { BaseSyntheticEvent, useState } from "react";
import { useCallback } from "react";
import { ApiService } from "../../services/api.service";

export function Signup(props: any) {
    const [emailControl, setEmailControl] = useState({ error: false, errorText: null, value: null });

    const handleFieldChange = useCallback((event: BaseSyntheticEvent, updateStateFunction: Function) => {
        if (!event.target.value) {
            updateStateFunction({ error: true, errorText: "Required", value: null });
        } else {
            updateStateFunction({ error: false, errorText: null, value: event.target.value });
        }
    }, []);

    const register = useCallback(async () => {
        try {
            const response = await ApiService.post("/auth/register", {
                email: emailControl.value,
            });
            const credentialCreationOptions = response.credentialCreationOptions;
            // Open authenticator for credential creation
            const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
                ...credentialCreationOptions,
                challenge: new Uint8Array(credentialCreationOptions.user.challenge),
                user: {
                    ...credentialCreationOptions.user,
                    id: Uint8Array.from(credentialCreationOptions.user.id),
                },
            };
            const credentials = await navigator.credentials.create({ publicKey: publicKeyCredentialCreationOptions });
        } catch (error) {
            console.error(error);
        }
    }, [emailControl.value]);

    return (
        <div className="signup-component">
            <Card>
                <CardContent>
                    <form autoComplete="off">
                        <TextField
                            onChange={(event: BaseSyntheticEvent) => handleFieldChange(event, setEmailControl)}
                            error={emailControl.error}
                            helperText={emailControl.errorText}
                            label="Email"
                            variant="outlined"
                        />
                    </form>
                </CardContent>
                <CardActions>
                    <Button onClick={register} disabled={emailControl.error} variant="contained" color="primary">
                        Sign-up
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
