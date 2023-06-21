/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                color1: "#e0e0e0",
                color2: "#000000",
                color1light: "#FF9F9F",
                color2light: "#4c4c4c",
            },
        },
    },
    plugins: [],
};
