import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chatter",
    description:
        "Welcome to Chatter! A place to chat with your friends! Built with Next.js, TailwindCSS, Firebase and socket.io.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <body>{children}</body>;
}
