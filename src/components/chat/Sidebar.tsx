import React from "react";
import SearchModule from "@/components/SearchModule";
import RoomList from "./RoomList";
import BottomBar from "../BottomBar";

function Sidebar() {
    return (
        <section className="max-h-full flex flex-col justify-between shadow-lg overflow-auto relative">
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
