"use client";

import { useAppStore } from "@/stores/AppStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

type Props = {
    children: React.ReactNode;
};

function ProtectedRouteProvider({ children }: Props) {
    const router = useRouter();
    const user = useAppStore((state) => state.user);
    const [socket, initializeSocket] = useAppStore((state) => [
        state.socket,
        state.initializeSocket,
    ]);

    useEffect(() => {
        if (user === "loading" || user === null) return;
        initializeSocket();
        return () => {
            socket?.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    if (user === null) {
        router.push("/");
    }

    if (user === "loading" || user == null) {
        return (
            <body className="w-screen h-screen flex justify-center items-center">
                <InfinitySpin width="200" color="#4fa94d" />
            </body>
        );
    }
    return <>{children}</>;
}

export default ProtectedRouteProvider;
