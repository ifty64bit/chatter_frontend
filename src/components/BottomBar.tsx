"use client";
import useGetUserInfoQuery from "@/app/hooks/useGetUserInfoQuery";
import { useAppStore } from "@/stores/AppStore";
import { type User } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import DialogBox from "./Dialog";
import ProfileEditSection from "./ProfileEditSection";

function BottomBar() {
    const currentUser = useAppStore((state) => state.user) as User;
    const user = useGetUserInfoQuery({ id: currentUser?.uid! });
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-1 px-2 py-4 rounded-lg border-t shadow-[0px_-5px_10px_1px_rgba(0,0,0,0.1)]">
            <Image
                src={
                    currentUser.photoURL ||
                    "https://img.icons8.com/pastel-glyph/40/user-male-circle.png"
                }
                width={40}
                height={40}
                alt="User_Image"
                className="rounded-full"
            />

            <p
                className="text-xs md:text-sm"
                style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
            >
                {user.data?.data.username || "Loading..."}
            </p>
            <Image
                width="35"
                height="35"
                src="https://img.icons8.com/fluency-systems-regular/48/settings--v1.png"
                alt="settings--v1"
                className="p-1 cursor-pointer hover:shadow-lg rounded-full hover:bg-slate-200"
                onClick={() => setIsOpen(true)}
            />
            <DialogBox
                title="Profile Setting"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <div>
                    <ProfileEditSection />
                </div>
            </DialogBox>
        </div>
    );
}

export default BottomBar;
