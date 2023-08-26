"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Input from "../Input";
import Button from "../Button";
import { SignupType, signupSchema } from "@/lib/schemas";

function SignupForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupType>({
        resolver: zodResolver(signupSchema),
    });

    return (
        <form
            className="space-y-4 max-w-sm md:max-w-lg p-4 border rounded-md shadow-lg"
            onSubmit={handleSubmit(async (data) => {
                try {
                    const response = await fetch(
                        "http://localhost:3001/auth/signup",
                        {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    // console.log(await response.json());
                    router.push("/login");
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
            <div className="flex flex-col sm:flex-row gap-4">
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    register={register("password")}
                    error={!!errors.password?.message}
                    errorMessage={errors.password?.message}
                />
                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    register={register("confirmPassword")}
                />
            </div>
            <Button type="submit" fullWidth>
                Sign up
            </Button>
        </form>
    );
}

export default SignupForm;
