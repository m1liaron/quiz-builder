import { ApiClient } from "./ApiClient";
import { API_URL } from "../common/constants/ApiUrl";
import { ApiRoutes } from "../common/constants/ApiRoutes";

class AuthApi {
    private client = new ApiClient(API_URL);

    async login(data: { email: string; password: string }) {
        const res = await this.client.request<{ token: string }>({
            method: "POST",
            url: `${ApiRoutes._}${ApiRoutes.Auth._}${ApiRoutes.Auth.Login}`,
            data,
        });

        this.client.setToken(res.token);
        return res;
    }

    async register(data: { name: string; email: string; password: string }) {
        return this.client.request({
            method: "POST",
            url: `${ApiRoutes._}${ApiRoutes.Auth._}${ApiRoutes.Auth.Register}`,
            data,
        });
    }
}

export const authApi = new AuthApi();