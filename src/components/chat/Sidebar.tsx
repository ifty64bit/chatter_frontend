"use client";
import React from "react";
import SearchModule from "@/components/SearchModule";
import RoomList from "@/components/chat/RoomList";
import BottomBar from "@/components/BottomBar";
import { useAppStore } from "@/stores/AppStore";

function Sidebar() {
    const [isSidebarOpen, setSidebarOpen] = useAppStore((state) => [
        state.isSidebarOpen,
        state.setSidebarOpen,
    ]);
    return (
        <section
            className={`${
                isSidebarOpen ? "w-full" : "w-0 md:w-auto"
            } h-screen pt-20 flex flex-col justify-between overflow-hidden fixed md:static bg-white bottom-0 z-10 border-r`}
        >
            <div id="search" className="px-4">
                <h3 className="font-semibold text-2xl mb-2">Chats</h3>
                <SearchModule />
            </div>
            <div id="chatlist" className="flex-1">
                <RoomList />
            </div>
            <div id="profile">
                <BottomBar />
            </div>
        </section>
    );
}

export default Sidebar;
