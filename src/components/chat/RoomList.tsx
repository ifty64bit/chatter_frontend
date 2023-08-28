"use client";
import { getRooms } from "@/apis/room";
import useMessageQuery from "@/app/hooks/useMessageQuery";
import { useAppStore } from "@/stores/AppStore";
import Image from "next/image";
import { useEffect } from "react";

function RoomList() {
    const [roomList, setRoomList, currentRoom, setCurrentRoom] = useAppStore(
        (state) => [
            state.roomList,
            state.setRoomList,
            state.currentRoom,
            state.setCurrentRoom,
        ]
    );

    const fetchMessage = useMessageQuery();

    //Trigger refetch of message when roomList changes
    useEffect(() => {
        if (!currentRoom) return;
        fetchMessage.refetch();
    }, [fetchMessage, currentRoom]);

    //Fetch roomList when mounted
    useEffect(() => {
        (async () => {
            const result = await getRooms();
            setRoomList(result.data);
        })();
    }, [setRoomList]);

    if (roomList.length === 0)
        return (
            <div className="space-y-4 p-1 md:p-4 flex-auto">
                <p>Search user to start Conversation.</p>
            </div>
        );
    return (
        <div className="space-y-4 p-1 md:p-4 flex-auto">
            {roomList.map((room, i) => (
                <div
                    key={i}
                    className="flex gap-4 items-center hover:bg-zinc-200 rounded-lg p-2 cursor-pointer"
                    onClick={() =>
                        setCurrentRoom({
                            id: room.id,
                            name: room.participants[0].user.username,
                        })
                    }
                >
                    <Image
                        width={40}
                        height={40}
                        src="https://img.icons8.com/pastel-glyph/40/user-male-circle.png"
                        alt="user-male-circle"
                        className="rounded-full"
                    />
                    <span className="inline-block">
                        {room.participants[0].user.username}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default RoomList;
