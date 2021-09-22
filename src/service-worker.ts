export type {};
declare const self: ServiceWorkerGlobalScope;
const ignored = (self as any).__WB_MANIFEST;

self.addEventListener("push", (event) => {
    const payload = event.data?.text();
    if (payload) {
        const { message } = JSON.parse(payload);
        // Display push notification
        event.waitUntil(
            self.registration.showNotification(message, {
                icon: `${process.env.PUBLIC_URL}/assets/images/logo.png`,
                badge: `${process.env.PUBLIC_URL}/assets/images/logo.png`,
            })
        );
    }
});
