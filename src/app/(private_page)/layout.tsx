import Header from "@/components/Header";
import ProtectedRouteProvider from "@/components/providers/ProtectedRouteProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chatter",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRouteProvider>
            <body className="grid md:grid-cols-[250px_1fr] grid-rows-[4rem_auto] md:gap-4 h-screen">
                <Header />
                {children}
            </body>
        </ProtectedRouteProvider>
    );
}
