/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#40516c",
        secondary: "#f9f9f9",
        danger: "#dc2f06",
        info: "#0189a3",
        warning: "#f36700",
        success:"#008659",
        "body-color":"#f3f4f6"
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
