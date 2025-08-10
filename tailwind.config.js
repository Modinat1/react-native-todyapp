/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "#ffffff",
        // black: "hsla(228, 6%, 11%, 1)",
        teal: "hsla(178, 63%, 39%, 1)",
        black: "hsla(225, 7%, 11%, 1)",
        red: "hsla(5, 81%, 56%, 1)",
        blue: "hsla(214, 89%, 52%, 1)",
        // secondary: "hsla(218, 9%, 51%, 1)",
        // card: {
        //   DEFAULT: "hsl(0 0% 100%)",
        //   foreground: "hsl(224 71.4% 4.1%)",
        // },
        // popover: {
        //   DEFAULT: "hsl(0 0% 100%)",
        //   foreground: "hsl(224 71.4% 4.1%)",
        // },
        primary: {
          DEFAULT: "hsla(178, 63%, 39%, 1)",
          // foreground: "hsl(210 20% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(218, 9%, 51%)",
          // foreground: "hsl(220.9 39.3% 11%)",
        },
        // secondary: "hsl(319, 30%, 16%)",
        muted: {
          DEFAULT: "hsl(0, 0%, 97%)",
          foreground: "hsl(323, 6%, 72%)",
        },
        accent: {
          DEFAULT: "hsl(0, 0%, 97%)",
          foreground: "hsl(225, 19%, 72%)",
        },
        destructive: {
          DEFAULT: "hsl(5, 81%, 56%)",
          foreground: "hsl(210 20% 98%)",
          background: "hsl(0, 100%, 88%)",
          "background-light": "hsl(0, 100%, 96%)",
        },
        success: {
          DEFAULT: "hsla(112, 97%, 64%)",
          foreground: "hsla(210 20% 98%)",
          background: "hsla(112, 96%, 89%)",
        },
        border: "hsla(220, 20%, 97%, 1)",
        input: "hsl(var(--input))",
        ring: "hsl(224 71.4% 4.1%)",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [],
};
