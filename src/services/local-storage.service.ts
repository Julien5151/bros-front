export interface State {
    token: string;
}

export class LocalStorageService {
    // Init local storage object
    private static localStorage = window.localStorage;

    /**
     * Save state in local storage
     */
    static saveState(state: State): void {
        this.localStorage.setItem("store", JSON.stringify(state));
    }

    /**
     * Retrieve state from local storage
     */
    static getState(): State | null {
        // Try to get and parse state
        try {
            const state = this.localStorage.getItem("store");
            if (!state) {
                console.error("No state found in local storage");
                return null;
            } else {
                return JSON.parse(state);
            }
        } catch (error) {
            console.error("Parsing of state failed");
            return null;
        }
    }

    /**
     * Reset state in local storage
     */
    static resetState(): void {
        // Try to get and parse state
        this.localStorage.removeItem("store");
    }
}
