"use client";
import React from "react";
import Button from "@/components/Button";
import Image from "next/image";
import {
    GoogleAuthProvider,
    signInWithPopup,
    getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppStore } from "@/stores/AppStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addOauthUser } from "@/apis/user";

function AuthBlock() {
    const [loading, setLoading] = React.useState(false); //change to loading state
    const router = useRouter();
    const setUser = useAppStore((state) => state.setUser);

    async function signInWithGoogle() {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const additionalUserInfo = getAdditionalUserInfo(result);
            setUser(result.user);
            //Check if new user
            if (additionalUserInfo?.isNewUser) {
                await addOauthUser(
                    result.user.email!,
                    result.user.uid,
                    result.user.photoURL || "",
                    result.user.displayName || ""
                );
            } else {
                console.log("Existing user!");
            }
            setLoading(false);
            router.push("/chat");
        } catch (error: any) {
            setLoading(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage, email, credential);
        }
    }

    return (
        <>
            <Link href={`/signup`}>
                <Button>Signup</Button>
            </Link>
            <Link href={`/login`}>
                <Button>Login</Button>
            </Link>
            <div className="max-w-sm flex gap-4 justify-center items-center">
                <hr className="min-w-[100px]" />
                <span className="text-sm">Or continue with</span>
                <hr className="min-w-[100px]" />
            </div>
            <Button
                variant="off-white"
                size="lg"
                onClick={() => signInWithGoogle()}
            >
                {" "}
                <Image
                    src={"https://img.icons8.com/fluency/48/google-logo.png"}
                    width={25}
                    height={25}
                    alt="google_logo"
                />{" "}
                Google
            </Button>
        </>
    );
}

export default AuthBlock;
