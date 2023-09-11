"use client";
import { useAppStore } from "@/stores/AppStore";
import Image from "next/image";
import React from "react";

function SidebarToggle() {
    const [isSidebarOpen, setSidebarOpen] = useAppStore((state) => [
        state.isSidebarOpen,
        state.setSidebarOpen,
    ]);
    return (
        <span
            className={`${
                isSidebarOpen ? "right-0 rotate-180" : "left-0"
            } h-28 fixed bg-white top-1/3 shadow-lg flex items-center border rounded-r-lg z-50 md:hidden`}
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
    );
}

export default SidebarToggle;
