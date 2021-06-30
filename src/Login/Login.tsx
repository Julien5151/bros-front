import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import "./Login.scss";

export function Login(props: any) {
    return (
        <div className="login-wrapper">
            <Card className="form">
                <CardContent>
                    <p>Test</p>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}
