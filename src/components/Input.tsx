import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: boolean;
    errorMessage?: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
}

function Input({
    label,
    name,
    error,
    errorMessage,
    placeholder,
    type,
    register,
}: Props) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                className={`w-full pr-12 pl-3 py-2 text-secondary bg-transparent outline-none border ${
                    error && "border-danger"
                } ${
                    error ? "focus:border-danger" : "focus:border-primary"
                } shadow-sm rounded-lg`}
                type={type}
                placeholder={placeholder}
                {...register}
            />
            <span className={`text-danger ${error ?? "opacity-0"}`}>
                {errorMessage}
            </span>
        </div>
    );
}

export default Input;
