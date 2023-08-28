export interface HttpResponse<T> {
    message: string;
    status: string;
    //Data is generic array
    data: Array<T>;
}

export interface User {
    id: string;
    username: string;
    email: string;
    name: string | null;
    avatar: string | null;
    roomId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface createdRoomResponse {
    id: number;
    name: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    id: number;
    text: string;
    userId: string;
    roomId: number;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        username: string;
        email: string;
        name: string | null;
        avatar: string | null;
        roomId: string | null;
        createdAt: string;
        updatedAt: string;
    };
}
