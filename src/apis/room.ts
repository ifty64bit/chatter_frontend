import httpClient from "@/lib/axios";
import { HttpResponse, createdRoomResponse } from "@/lib/types";

export const createRoom = async (
    roomName: any,
    participants: Array<string>
): Promise<any> => {
    try {
        const { data } = await httpClient.post<any>("/rooms", {
            name: roomName,
            participants,
        });
        return data;
    } catch (error: any) {
        return error;
    }
};

export const getRooms = async (): Promise<HttpResponse<any>> => {
    try {
        const { data } = await httpClient.get<HttpResponse<any>>("/rooms/user");
        return data;
    } catch (error: any) {
        return error;
    }
};
