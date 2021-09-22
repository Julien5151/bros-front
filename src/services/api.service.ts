import { DEVELOPMENT, DEVELOPMENT_BASE_URL, PRODUCTION_BASE_URL } from "../utils/constants";
import { LocalStorageService } from "./local-storage.service";

export class ApiService {
    // Set base URL depending on environment
    //static BASE_URL = process.env.NODE_ENV === DEVELOPMENT ? DEVELOPMENT_BASE_URL : PRODUCTION_BASE_URL;
    static BASE_URL = DEVELOPMENT_BASE_URL;

    static async post(endpoint: string, body: any, authentication: boolean = true): Promise<any> {
        const requestInit: RequestInit = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body), // body data type must match "Content-Type" header
        };
        // Add authentication header
        if (authentication) {
            requestInit.headers = {
                ...requestInit.headers,
                Authorization: LocalStorageService.getState()?.token ?? "",
            };
        }
        const response = await fetch(this.BASE_URL + endpoint, requestInit);
        return this.handleResponse(response);
    }

    static async get(endpoint: string, authentication: boolean = true): Promise<any> {
        const requestInit: RequestInit = {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        };
        // Add authentication header
        if (authentication) {
            requestInit.headers = {
                Authorization: LocalStorageService.getState()?.token ?? "",
            };
        }
        // Default options are marked with *
        const response = await fetch(this.BASE_URL + endpoint, requestInit);
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
