export type {};
declare const self: ServiceWorkerGlobalScope;
const ignored = (self as any).__WB_MANIFEST;

self.addEventListener("install", (event) => {
    console.log("Install event : " + event);
});
