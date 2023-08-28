import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chatter",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <body>{children}</body>;
}
