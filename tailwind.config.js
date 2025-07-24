/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        md: '0 2px 4px var(--tw-shadow-color)', // This is the one used here
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  corePlugins: {
    preflight: false, // Disable Tailwind’s default resets
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: theme('textShadow.sm', '0 1px 2px rgba(0, 0, 0, 0.25)'),
        },
        '.text-shadow-md': {
          textShadow: theme('textShadow.md', '0 2px 4px rgba(0, 0, 0, 0.4)'), // Default for blue glow: rgba(59, 130, 246, 0.6)
        },
        '.text-shadow-lg': {
          textShadow: theme('textShadow.lg', '0 8px 16px rgba(0, 0, 0, 0.5)'),
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
};