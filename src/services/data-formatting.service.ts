export class DataFormatting {
    /**
     * Converts an ArrayBuffer to a base64 encoded string
     */
    static arrayBufferToBase64(buffer: ArrayBuffer) {
        let binary = "";
        // Convert buffer to Uint8Array
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            // Concatenate string using char at index point provided by Uint8Array
            binary += String.fromCharCode(bytes[i]);
        }
        // Return encoded string using base64
        console.log(binary);
        return window.btoa(binary);
    }
}
