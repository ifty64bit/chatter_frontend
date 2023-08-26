import React from "react";
import SearchModule from "@/components/SearchModule";
import RoomList from "./RoomList";

function Sidebar() {
    return (
        <section className="max-h-full shadow-lg overflow-auto relative">
            <div className="sticky top-0 bg-white p-1 md:p-4 shadow-lg rounded-b-lg border-b">
                <div className="hidden md:block">
                    <h3 className="font-semibold text-2xl mb-2">Chats</h3>
                </div>
                <div className="hidden md:block">
                    <SearchModule />
                </div>
            </div>
            <RoomList />
        </section>
    );
}

export default Sidebar;
