"use client";
import React from "react";
import { Pacifico } from "next/font/google";
import Button from "@/components/Button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });

function Header() {
    return (
        <header className="p-4 fixed inset-x-0 z-50 top-0 bg-white flex justify-between items-center border-b">
            <h1 className={`${pacifico.className} text-4xl`}>Chatter</h1>
            <Button variant="danger" onClick={() => signOut(auth)}>
                sign out
            </Button>
        </header>
    );
}

export default Header;
