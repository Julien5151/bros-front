export class ApiService {
    static async post(url: string, body: any): Promise<any> {
        // Default options are marked with *
        const response = await fetch(url, {
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
