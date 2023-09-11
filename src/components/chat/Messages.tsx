"use client";
import useMessageQuery from "@/app/hooks/useMessageQuery";
import { useAppStore } from "@/stores/AppStore";
import type { User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import MessageBlock from "./MessageBlock";
import Image from "next/image";

function Messages() {
    const messages = useMessageQuery();
    const [textInput, setTextInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const currentUser = useAppStore((state) => state.user) as User;
    const [socket, currentRoom, setSidebarOpen] = useAppStore((state) => [
        state.socket,
        state.currentRoom,
        state.setSidebarOpen,
    ]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.lastElementChild?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    }, [messages.data]);

    async function sendMessage() {
        socket?.emit("create:message", {
            message: textInput,
            roomId: currentRoom?.id,
            userId: currentUser.uid,
        });
        setTextInput("");
    }
    if (currentRoom === null)
        return (
            <section className="fixed w-full bottom-0 top-20 bg-white flex justify-center items-center">
                <h3 className="font-semibold text-xl text-secondaryLight">
                    Select a room to start chatting
                </h3>
            </section>
        );

    return (
        <section className="h-full pt-20">
            {/* Room Name */}
            <div id="room_name" className="border-b p-4 fixed w-full bg-white">
                <h3 className="font-semibold text-xl">{currentRoom?.name}</h3>
            </div>

            <div
                className="flex flex-col gap-4 mt-4 px-4 overflow-y-scroll h-[calc(100vh-10rem)] max-h-full"
                ref={messagesEndRef}
            >
                {messages.isFetched === true && currentRoom !== null
                    ? messages.data?.map((message: any) => (
                          <MessageBlock
                              key={message.id}
                              self={message.user.id === currentUser.uid}
                              text={message.text}
                          />
                      ))
                    : null}
            </div>
            <div className="sticky mt-auto bottom-0 left-0 right-0 bg-white w-full pt-4">
                <form
                    className="flex gap-4 items-center"
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (textInput.trim() === "") return;
                        sendMessage();
                    }}
                >
                    <input
                        type="text"
                        name="message"
                        className="w-full border rounded-full px-4 py-2"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="p-2 border rounded-full hover:bg-primaryDark"
                    >
                        <Image
                            width="30"
                            height="30"
                            src="https://img.icons8.com/ios-glyphs/30/000000/sent.png"
                            alt="sent"
                        />
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Messages;
