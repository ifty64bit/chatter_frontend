"use client";
import React from "react";
import SearchModule from "@/components/SearchModule";
import RoomList from "./RoomList";
import BottomBar from "../BottomBar";
import Image from "next/image";
import { useAppStore } from "@/stores/AppStore";

function Sidebar() {
    const [isSidebarOpen, setSidebarOpen] = useAppStore((state) => [
        state.isSidebarOpen,
        state.setSidebarOpen,
    ]);
    return (
        <section
            className={`${
                isSidebarOpen ? "w-screen" : "w-0"
            } max-h-full flex flex-col justify-between shadow-lg overflow-auto relative`}
        >
            <span
                className="h-28 fixed bg-white left-0 top-1/3 z-20 shadow-lg flex items-center border rounded-r-lg"
                onClick={() => setSidebarOpen()}
            >
                <Image
                    width="24"
                    height="24"
                    src="https://img.icons8.com/material/24/more-than--v1.png"
                    alt="more-than--v1"
                    className="cursor-pointer"
                />
            </span>
            <div className="sticky top-0 bg-white p-1 md:p-4 shadow-lg rounded-b-lg border-b">
                <div className="hidden md:block">
                    <h3 className="font-semibold text-2xl mb-2">Chats</h3>
                </div>
                <div className="">
                    <SearchModule />
                </div>
            </div>
            <RoomList />
            <BottomBar />
        </section>
    );
}

export default Sidebar;
