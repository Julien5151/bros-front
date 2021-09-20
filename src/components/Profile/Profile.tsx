import { Card, CardContent } from "@material-ui/core";
import { useEffect, useState } from "react";
import { User, UserService } from "../../services/user.service";
import "./Profile.scss";

export function Profile(props: any) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (!user) {
            const fetchProfile = async () => {
                const user = await UserService.getProfile();
                setUser(user);
            };
            fetchProfile();
        }
    });

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
