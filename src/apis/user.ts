import httpClient from "@/lib/axios";
import { HttpResponse, User } from "@/lib/types";

export const searchUser = async (
    query: string
): Promise<HttpResponse<User>> => {
    try {
        const { data } = await httpClient.get<HttpResponse<User>>(
            `/users/search/${query}`
        );
        return data;
    } catch (error: any) {
        return error;
    }
};

export const addOauthUser = async (
    email: string,
    id: string,
    avatar: string,
    displayName: string
): Promise<HttpResponse<any>> => {
    try {
        const { data } = await httpClient.post<HttpResponse<any>>(
            "/auth/signup/outh",
            {
                email,
                id,
                avatar,
                displayName,
            }
        );
        return data;
    } catch (error: any) {
        return error;
    }
};
