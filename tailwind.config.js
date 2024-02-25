/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}' /* src folder, for example */,
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  plugins: [
    // ...
    // eslint-disable-next-line no-undef
    require('flowbite/plugin'),
  ],
  darkMode: 'class',
};