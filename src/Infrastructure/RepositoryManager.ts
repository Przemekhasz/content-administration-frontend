import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { apiUrl } from "../env";

export default class RepositoryManager {
    private readonly baseUrl: string;
    private client: AxiosInstance;

    constructor() {
        this.baseUrl = apiUrl;
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    public async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
        try {
            return await this.client.get<T>(endpoint);
        } catch (error) {
            throw new Error('GET request failed: ' + error);
        }
    }

    public async post<T, U>(endpoint: string, data: U): Promise<AxiosResponse<T>> {
        try {
            return await this.client.post<T>(endpoint, data);
        } catch (error) {
            throw new Error('POST request failed: ' + error);
        }
    }

    public async put<T, U>(endpoint: string, data: U): Promise<AxiosResponse<T>> {
        try {
            return await this.client.put<T>(endpoint, data);
        } catch (error) {
            throw new Error('PUT request failed: ' + error);
        }
    }

    public async patch<T, U>(endpoint: string, data: U): Promise<AxiosResponse<T>> {
        try {
            return await this.client.patch<T>(endpoint, data);
        } catch (error) {
            throw new Error('PATCH request failed: ' + error);
        }
    }

    public async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
        try {
            return await this.client.delete<T>(endpoint);
        } catch (error) {
            throw new Error('DELETE request failed: ' + error);
        }
    }
}
