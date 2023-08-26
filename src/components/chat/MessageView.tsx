"use client";
import React from "react";
import MessageBlock from "@/components/chat/MessageBlock";
import Image from "next/image";
import useMessageQuery from "@/app/hooks/useMessageQuery";
import { useAppStore } from "@/stores/AppStore";
import { User } from "firebase/auth";

function MessageView() {
    const messages = useMessageQuery();
    const [textInput, setTextInput] = React.useState("");
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const currentUser = useAppStore((state) => state.user) as User;
    const [socket, currentRoom] = useAppStore((state) => [
        state.socket,
        state.currentRoom,
    ]);

    React.useEffect(() => {
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
            <section className="flex flex-col justify-center items-center shadow-lg p-4">
                <div className="py-2">
                    <h3 className="font-semibold text-xl text-secondaryLight">
                        Select a room to start chatting
                    </h3>
                </div>
            </section>
        );
    return (
        <section className="flex flex-col justify-between shadow-lg p-4 relative overflow-auto">
            <div className="border-b py-2">
                <h3 className="font-semibold text-xl">{currentRoom?.name}</h3>
            </div>

            <div
                className="flex flex-col gap-4 mt-4 overflow-auto"
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

export default MessageView;
