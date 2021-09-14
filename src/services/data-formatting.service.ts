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
        return window.btoa(binary);
    }

    /**
     * Converts a string to a Uint8Array
     */
    static stringToUInt8ArrayBuffer(string: string): Uint8Array {
        return Uint8Array.from(string, (c: string) => c.charCodeAt(0));
    }
}
