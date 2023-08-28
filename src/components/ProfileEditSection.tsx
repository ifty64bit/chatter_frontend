import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import { useAppStore } from "@/stores/AppStore";
import useGetUserInfoQuery from "@/app/hooks/useGetUserInfoQuery";
import type { User } from "firebase/auth";
import { ProfileType, profileSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";

function ProfileEditSection() {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const currentUser = useAppStore((state) => state.user) as User;
    const { data: user } = useGetUserInfoQuery({ id: currentUser?.uid! });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.data?.name || "",
            photo: user.data?.avatar || "",
            username: user.data?.username || "",
        },
    });

    console.log(user.data);

    return (
        <form>
            <div className="flex justify-between gap-2">
                <div>
                    <Input
                        label="Name"
                        name="name"
                        register={register("name")}
                    />
                    <Input
                        label="Username"
                        name="username"
                        register={register("username")}
                    />
                </div>
                <div className="flex flex-col gap-2 justify-center items-center mb-2">
                    <Image
                        src={
                            currentUser.photoURL ||
                            "https://img.icons8.com/pastel-glyph/40/user-male-circle.png"
                        }
                        width={50}
                        height={50}
                        alt="User_Image"
                        className="rounded-full"
                    />
                    <input
                        type="file"
                        {...register("photo")}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Change
                    </Button>
                </div>
            </div>
            <div></div>
        </form>
    );
}

export default ProfileEditSection;
