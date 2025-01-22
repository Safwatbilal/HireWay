/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: '#646669',
        bgColor: '#323437',
        second: '#F39C12',
        bgSecond: '#2c2e31',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '100%',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      screens: {
        sm: '640px',  // Small screens (e.g., phones)
        md: '768px',  // Medium screens (e.g., tablets)
        lg: '1024px', // Large screens (e.g., laptops)
        xl: '1280px', // Extra-large screens
      },
      scrollbar: (theme) => ({
        DEFAULT: {
          thumb: theme('colors.second'),
          track: theme('colors.bgSecond'),
        },
        thin: {
          thumb: theme('colors.second'),
          track: theme('colors.bgSecond'),
        },
      }),
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
