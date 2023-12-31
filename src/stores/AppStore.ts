import { create } from "zustand";
import { User, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { type Socket, io } from "socket.io-client";
import { queryClient } from "@/components/providers/DefaultProviderWrapper";
import { Message } from "@/lib/types";

const googleProvider = new GoogleAuthProvider();

interface AppStore {
    user: null | User | "loading";
    userName: string | null;
    socket: Socket | null;
    roomList: Array<any>;
    currentRoom: {
        id: number;
        name: string;
    } | null;
    isSidebarOpen: boolean;
    setCurrentRoom: (room: { id: number; name: string }) => void;
    setUser: (user: null | User) => void;
    setRoomList: (rooms: any) => void;
    addRoom: (room: any) => void;
    removeRoom: (roomId: string) => void;
    initFirebaseAuth: () => void;
    signinWithGoogle: () => void;
    initializeSocket: () => void;
    setSidebarOpen: (isOpen?: boolean) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
    user: "loading",
    userName: null,
    socket: null,
    //We could move roomlist to react query
    roomList: [],
    currentRoom: null,
    isSidebarOpen: false,
    setCurrentRoom: (room: { id: number; name: string }) =>
        set({ currentRoom: { ...room } }),
    setRoomList: (rooms) => set({ roomList: [...rooms] }),
    addRoom: (room) => {
        set({
            roomList: [
                room,
                ...get().roomList.filter((oldRoom) => oldRoom.id !== room.id),
            ],
        });
    },
    removeRoom: (roomId) => {
        set({
            roomList: get().roomList.filter((room) => room.id !== roomId),
        });
    },
    setUser: (user) => set({ user }),
    initFirebaseAuth: () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                set({ user });
            } else {
                set({ user: null });
            }
        });
    },
    signinWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            set({ user: result.user });
        } catch (error) {
            if (error instanceof FirebaseError) {
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                console.log(credential);
            }
        }
    },
    initializeSocket: async () => {
        // console.log("Initializing socket");

        const token =
            (await (get().user as User).getIdToken( true)) ||
            null;

        const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
            auth: {
                token,
            },
        });

        // console.log("Socket initialized");

        // socket.on("connect", () => {
        //     console.log("connected");
        // });
        socket.on("disconnect", () => {
            // console.log("disconnected");
            set({ socket: null });
        });
        socket.on("error", (error) => {
            console.error(error);
        });

        socket.on(`message:${(get().user as User).uid}`, (message: Message) => {
            // Check new message room in roomList
            const room = get().roomList.find(
                (room) => room.id === message.roomId
            );
            if (!room) {
                // If not found, add it to roomList
                set({
                    roomList: [
                        {
                            id: message.roomId,
                            name: message.user.username,
                            participants: [
                                {
                                    user: {
                                        id: message.user.id,
                                        username: message.user.username,
                                        name: message.user.name || null,
                                        avatar: message.user.avatar || null,
                                    },
                                },
                            ],
                        },
                        ...get().roomList,
                    ],
                });
            } else {
                //Bring room to top
                set({
                    roomList: [
                        room,
                        ...get().roomList.filter(
                            (oldRoom) => oldRoom.id !== room.id
                        ),
                    ],
                });
            }
            const currentRoom = get().currentRoom?.id;
            queryClient.setQueryData([currentRoom], (data: unknown) => {
                if (data === undefined) return [message];
                return [...(data as Array<Message>), message];
            });
        });

        set({ socket });
    },
    setSidebarOpen(state) {
        if (state) {
            return set({ isSidebarOpen: state });
        } else {
            set({ isSidebarOpen: !get().isSidebarOpen });
        }
    },
}));
