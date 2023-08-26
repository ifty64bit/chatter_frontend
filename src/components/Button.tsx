import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { type } from "os";

interface ButtonProps
    extends React.HTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    variant?:
        | "primary"
        | "secondary"
        | "danger"
        | "warning"
        | "success"
        | "off-white";
    size?: "sm" | "md" | "lg" | "default";
    fullWidth?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const buttonVariants = cva(
    `inline-flex justify-center items-center gap-2 border rounded-md shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-90 hover:shadow-lg`,
    {
        variants: {
            variant: {
                primary: "bg-primary hover:bg-primaryDark text-white",
                secondary: "bg-secondary hover:bg-secondaryDark text-white",
                danger: "bg-danger hover:bg-dangerDark text-white",
                warning: "bg-warning hover:bg-warningDark text-white",
                success: "bg-success hover:bg-successDark text-white",
                "off-white": "bg-white hover:bg-gray-100 text-gray-800",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 px-3",
                md: "h-10 px-4",
                lg: "h-11 px-8",
            },
            fullWidth: {
                true: "w-full",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

function Button({
    variant,
    size,
    disabled,
    children,
    fullWidth,
    onClick,
    type,
    className,
}: ButtonProps) {
    return (
        <button
            type={type}
            className={`${buttonVariants({
                variant,
                size,
                fullWidth,
            })} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
