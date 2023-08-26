"use client";

import { useAppStore } from "@/stores/AppStore";
import { useEffect } from "react";

export default function FirebaseAuthProvider({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode {
    const initFirebaseAuth = useAppStore((state) => state.initFirebaseAuth);

    useEffect(() => {
        initFirebaseAuth();
    }, [initFirebaseAuth]);
    return <>{children}</>;
}
