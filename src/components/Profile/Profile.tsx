import { Card, CardContent } from "@material-ui/core";
import "./Profile.scss";

export function Profile(props: any) {
    return (
        <div className="profile-component">
            <Card>
                <CardContent>
                    <p>This is a profile</p>
                </CardContent>
            </Card>
        </div>
    );
}
