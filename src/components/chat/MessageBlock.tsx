import React from "react";

interface MessageBlockProps {
    self?: boolean;
    text: string;
}

function MessageBlock({ self, text }: MessageBlockProps) {
    return (
        <p
            className={`max-w-sm px-4 py-2 bg-primaryLight rounded-full ${
                self ? "self-end" : "self-start"
            }`}
        >
            {text}
        </p>
    );
}

export default MessageBlock;
