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
            <body>
                <Header />
                <main className="max-h-screen overflow-hidden grid md:grid-cols-[250px_auto] relative">
                    {children}
                </main>
            </body>
        </ProtectedRouteProvider>
    );
}
