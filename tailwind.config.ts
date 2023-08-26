/** @type {import('tailwindcss').Config} */
import { blue, gray, red, yellow, green } from "tailwindcss/colors";
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: blue[500],
                primaryLight: blue[400],
                primaryDark: blue[600],
                secondary: gray[500],
                secondaryLight: gray[400],
                secondaryDark: gray[600],
                danger: red[500],
                dangerLight: red[400],
                dangerDark: red[600],
                warning: yellow[500],
                warningLight: yellow[400],
                warningDark: yellow[600],
                success: green[500],
                successLight: green[400],
                successDark: green[600],
            },
            borderRadius: {},
            keyframes: {},
            animation: {},
        },
    },
    plugins: [require("@headlessui/tailwindcss")],
};
