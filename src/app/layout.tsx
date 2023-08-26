import DefaultProviderWrapper from "@/components/providers/DefaultProviderWrapper";
import "./globals.css";
import FirebaseAuthProvider from "@/components/providers/FirebaseAuthProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
