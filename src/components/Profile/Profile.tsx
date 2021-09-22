import { Button, Card, CardContent } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
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
            // Display profile fetched notification
            new Notification("Profile fetched successfully", {
                icon: `${process.env.PUBLIC_URL}/assets/images/logo.png`,
            });
        }
    });

    const askNotificationPermissions = useCallback(async () => {
        await Notification.requestPermission();
    }, []);

    return (
        <div className="profile-component">
            <Card>
                <CardContent>
                    <p>This is a profile</p>
                    <Button onClick={askNotificationPermissions} variant="contained" color="primary">
                        Permissions
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
