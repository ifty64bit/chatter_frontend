"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { auth } from "@/lib/firebase";
import { LoginType, loginSchema } from "@/lib/schemas";
import { useAppStore } from "@/stores/AppStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function Page() {
    const setUser = useAppStore((state) => state.setUser);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    });
    return (
        <main className="w-screen h-screen flex justify-center items-center">
            <form
                className="space-y-4"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        const res = await signInWithEmailAndPassword(
                            auth,
                            data.email,
                            data.password
                        );
                        setUser(res.user);
                        router.push("/chat");
                    } catch (error) {
                        console.error(error);
                    }
                })}
            >
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    register={register("email")}
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    register={register("password")}
                />
                <Button type="submit">Login</Button>
            </form>
        </main>
    );
}

export default Page;
