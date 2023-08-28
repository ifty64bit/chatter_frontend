import DefaultProviderWrapper from "@/components/providers/DefaultProviderWrapper";
import "./globals.css";
import FirebaseAuthProvider from "@/components/providers/FirebaseAuthProvider";
import { Inter } from "next/font/google";
import { type Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chatter",
    description:
        "Welcome to Chatter! A place to chat with your friends! Built with Next.js, TailwindCSS, Firebase and socket.io.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.className}>
            <DefaultProviderWrapper>
                <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
            </DefaultProviderWrapper>
        </html>
    );
}
