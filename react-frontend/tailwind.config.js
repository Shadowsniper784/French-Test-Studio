module.exports = {
  mode: "jit",
  darkMode: "class",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        "dark-text-primary": "#F3F4F6",
        "dark-text-secondary": "#F9FAFB",
        "dark-bg-primary": "#374151",
        "dark-bg-secondary": "#1F2937",
        "dark-bg-hover": "#111827",
        "text-primary": "#111827",
        "text-secondary": "#171717",
        "bg-primary": "#D4D4D8",
        "bg-secondary": "#E4E4E7",
        "bg-hover": "#A1A1AA",
      },
      screens: {
        "phone": {
          "raw": "(max-width: 639.99px)"
        },
        "tablet": {
          "raw": "(min-width: 640px) and (max-width: 1023.99px)"
        },
        "desktop": {
          "raw": "(min-width: 1024px) and (max-width: 1279.99px)"
        },
        "large-desktop": {
          "raw": "(min-width: 1280px) and (max-width: 1919.99px)"
        },
        "ultra-large-desktop": {
          "raw": "(min-width: 1920px)"
        }
      }
    }
  },
  plugins: [],
}
