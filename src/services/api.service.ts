import { DEVELOPMENT, DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL } from "../utils/constants";

export class ApiService {
    // Set base URL depending on environment
    static BASE_URL = process.env.NODE_ENV === DEVELOPMENT ? DEVELOPMENT_BASE_URL : PRODUCTION_BASE_URL;

    static async post(endpoint: string, body: any): Promise<any> {
        // Default options are marked with *
        const response = await fetch(this.BASE_URL + endpoint, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body), // body data type must match "Content-Type" header
        });
        return this.handleResponse(response);
    }

    static async handleResponse(response: Response): Promise<any> {
        // Error HTTP status
        if (response.status >= 400) {
            throw await response.json();
        } else {
            // Success
            return await response.json();
        }
    }
}
