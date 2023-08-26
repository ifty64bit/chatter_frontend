"use client";
import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { searchUser } from "@/apis/user";
import { User } from "@/lib/types";
import { createRoom } from "@/apis/room";
import { useAppStore } from "@/stores/AppStore";

function SearchModule() {
    const [searchInput, setSearchInput] = useState("");
    const [userList, setUserList] = useState<Array<User>>([]);
    const addRoom = useAppStore((state) => state.addRoom);
    const [roomList, setRoomList, setCurrentRoom] = useAppStore((state) => [
        state.roomList,
        state.setRoomList,
        state.setCurrentRoom,
    ]);

    //debounse with timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            (async () => {
                if (searchInput.length < 3) return;
                const result = await searchUser(searchInput);
                setUserList([...result.data]);
            })();
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    //Create room with selected user
    async function createMessageRoom(roomName: string, participantId: string) {
        const result = await createRoom(roomName, [participantId]);
        //Logic if Room already exists
        if (result.message === "room_exists") {
            setRoomList([
                result.data,
                ...roomList.filter((room) => room.id !== result.data.id),
            ]);
            // console.log(result);

            setCurrentRoom({
                id: result.data.id,
                name: result.data.participants[0].user.username,
            });
            return;
        }
        setCurrentRoom({
            id: result.data.id,
            name: result.data.participants[0].user.username,
        });
        addRoom(result.data);
        setSearchInput("");
    }

    return (
        <>
            <Combobox>
                <Combobox.Input
                    className="w-full px-3 py-2 text-secondary bg-transparent outline-none border shadow-sm rounded-lg"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <Combobox.Options className={`rounded-lg bg-slate-300 mt-2`}>
                    {userList.map((person) => (
                        <Combobox.Option
                            key={person.id}
                            value={person.username}
                            className={`p-2 cursor-pointer hover:bg-secondaryLight rounded-lg`}
                            onClick={() =>
                                createMessageRoom(person.username, person.id)
                            }
                        >
                            {person.username}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </>
    );
}

export default SearchModule;
