/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#702299",
          deep: "#4E176F",
          soft: "#F4EAF8"
        },
        porcelain: "#FAF7F2",
        ink: "#2B2B2B",
        linen: "#EFE4D6",
        terracotta: "#B66A50",
        sage: "#8FA99B",
        wine: "#5A3430",
        paper: "#FFFFFF"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(90, 52, 48, 0.08)",
        card: "0 14px 35px rgba(43, 43, 43, 0.06)",
        panel: "0 12px 30px rgba(15, 23, 42, 0.06)",
        sidebar: "12px 0 32px rgba(15, 23, 42, 0.04)",
        brand: "0 16px 34px rgba(112, 34, 153, 0.18)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"]
      }
    }
  },
  plugins: []
};
