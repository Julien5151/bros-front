import { ApiService } from "./api.service";

export interface User {
    // Mandatory properties
    firstName: string;
    lastName: string;
    email: string;
    zipcode: number;
    // Optional properties
    _id: string;
    createdAt: Date;
    phone: string | null;
    address: string | null;
    groupId: string | null;
    availableForGrouping: boolean;
}

export class UserService {
    /**
     * Retrieve user profile
     */
    static async getProfile(): Promise<User> {
        // Get user profile
        const userProfile = await ApiService.get("/profile");
        return userProfile as User;
    }
}
