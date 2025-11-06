// Configuration Tailwind CSS pour La Petite Berceuse
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF5F5",
          100: "#FFE5E5",
          200: "#FFCCCC",
          300: "#FFB3B3",
          400: "#FF9CA0",
          500: "#FF9CA0",
          600: "#FF9CA0",
          700: "#FF9CA0",
          800: "#CC7D80",
          900: "#995E60",
        },
        secondary: {
          50: "#F2F7F0",
          100: "#E5EFE1",
          200: "#CBDFC3",
          300: "#B1CFA5",
          400: "#8BB883",
          500: "#8BB883",
          600: "#8BB883",
          700: "#6F9369",
          800: "#536E4F",
          900: "#374A35",
        },
        accent: {
          50: "#F9F9F9",
          100: "#F4F4F4",
          200: "#EEEEEE",
          300: "#D9D9D9",
          400: "#989898",
          500: "#545454",
          600: "#545454",
          700: "#545454",
          800: "#434343",
          900: "#323232",
        },
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Inter", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "0.45" },
          "100%": { opacity: "0.35" },
        },
        quotePulse: {
          "0%": { transform: "scale(1)", opacity: "0.25" },
          "50%": { transform: "scale(1.05)", opacity: "0.45" },
          "100%": { transform: "scale(1)", opacity: "0.25" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.9s ease-out forwards",
        fadeUpDelay: "fadeUp 0.9s ease-out 0.2s forwards",
        fadeUpSlow: "fadeUp 0.9s ease-out 0.4s forwards",
        gradientShift: "gradientShift 12s ease-in-out infinite",
        quotePulse: "quotePulse 4s ease-in-out infinite",
      },
    },
  },
};

