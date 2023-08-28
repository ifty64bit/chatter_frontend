import React from "react";

interface MessageBlockProps {
    self?: boolean;
    text: string;
}

function MessageBlock({ self, text }: MessageBlockProps) {
    return (
        <p
            className={`max-w-sm px-4 py-2  rounded-3xl ${
                self
                    ? "self-end bg-secondaryLight"
                    : "self-start bg-primaryLight"
            }`}
        >
            {text}
        </p>
    );
}

export default MessageBlock;
