import { Button, Card, CardActions, CardContent, TextField } from "@material-ui/core";
import "./Register.scss";
import { BaseSyntheticEvent, useState } from "react";
import { useCallback } from "react";
import { ApiService } from "../../services/api.service";
import { DataFormatting } from "../../services/data-formatting.service";

export function Register(props: any) {
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
                challenge: DataFormatting.stringToUInt8ArrayBuffer(credentialCreationOptions.challenge),
                user: {
                    ...credentialCreationOptions.user,
                    id: DataFormatting.stringToUInt8ArrayBuffer(credentialCreationOptions.user.id),
                },
            };
            const credentials = (await navigator.credentials.create({
                publicKey: publicKeyCredentialCreationOptions,
            })) as PublicKeyCredential;
            // Send public credentials to server for validation
            const signupRequestBody: any = {
                publicKeyCredential: {
                    id: credentials.id,
                    rawId: DataFormatting.arrayBufferToBase64(credentials.rawId),
                    response: {
                        attestationObject: DataFormatting.arrayBufferToBase64(
                            (credentials.response as any).attestationObject
                        ),
                        clientDataJSON: DataFormatting.arrayBufferToBase64(credentials.response.clientDataJSON),
                    },
                },
            };
            const signupResponse = await ApiService.post("/auth/signup", signupRequestBody);
            console.log(signupResponse);
        } catch (error) {
            console.error(error);
        }
    }, [emailControl.value]);

    return (
        <div className="register-component">
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
