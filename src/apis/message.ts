import httpClient from "@/lib/axios";
import { HttpResponse } from "@/lib/types";
import { useAppStore } from "@/stores/AppStore";
import { User } from "firebase/auth";

export const getMessageFromRoom = async (roomId: number): Promise<any> => {
    try {
        const { data } = await httpClient.get<HttpResponse<any>>(
            `/messages/${roomId}`
        );
        return data.data;
    } catch (error: any) {
        return error;
    }
};

export const sendMessage = async (payload: {
    message: string;
    roomId: number;
    userId: string;
}): Promise<any> => {
    try {
        const { data } = await httpClient.post<any>(`/messages`, payload);
        return data.data;
    } catch (error: any) {
        return error;
    }
};

export const testMessage = async () => {
    try {
        const socket = useAppStore.getState().socket;
        const currentUser = useAppStore.getState().user as User;
        socket?.emit(`create:message`, {
            roomId: 1,
            userId: currentUser.uid,
            message: "Hello",
        });
        console.log("sent");
    } catch (error: any) {
        return error;
    }
};
