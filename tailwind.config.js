/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', // This looks for HTML files in the root directory
    './src/**/*.{js,ts,jsx,tsx}', // This is a common pattern for source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
