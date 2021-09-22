import { Button, Card, CardContent } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { User, UserService } from "../../services/user.service";
import { ApiService } from "../../services/api.service";
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

    const askNotificationPermissions = useCallback(async () => {
        const result = await Notification.requestPermission();
        if (result === "granted") {
            // Setup SW push notification subscription
            const swReg = await navigator.serviceWorker.ready;
            const pushSub = await swReg.pushManager.getSubscription();
            if (!pushSub) {
                // Create new subscription
                const vapidPublicKey =
                    "BPUUeqOwwaXk7DEMrQyE4de6BORpvyYus0RS0hs5iwJHEcRcelf0CxM6xKMt3IBSakymvGJ3sSEEZXLvpZnmye4";
                //const convertedKey = DataFormattingService.stringToUInt8ArrayBuffer(vapidPublicKey);
                const newSub = await swReg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: vapidPublicKey,
                });
                // Send new sub to backend
                const response = await ApiService.post("/subscriptions", newSub);
                console.log(response);
            } else {
                // We already have a subscription
            }
        }
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
