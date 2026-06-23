import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export class ApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            withCredentials: false,
        });
    }

    public async request<T>(config: AxiosRequestConfig): Promise<T> {
        const res = await this.client.request<T>(config);
        return res.data;
    }

    public async authRequest<T>(config: AxiosRequestConfig): Promise<T> {
        const token = this.getToken();

        if (!token) {
            throw new Error("No auth token found");
        }

        const res = await this.client.request<T>({
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            },
        });

        return res.data;
    }

    private getToken(): string | null {
        return localStorage.getItem("token");
    }

    public setToken(token: string) {
        localStorage.setItem("token", token);
    }

    public clearToken() {
        localStorage.removeItem("token");
    }
}