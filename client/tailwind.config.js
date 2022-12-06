/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                color1: "#E97777",
                color2: "#FCDDB0",
                color1light: "#FF9F9F",
                color2light: "#FFFAD7",
            },
        },
    },
    plugins: [],
};
