/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                sunflower: '#FACC15',
                'golden-yellow': '#F59E0B',
                'warm-orange': '#EA580C',
                cream: '#FEF3C7',
                'soft-green': '#4ADE80',
                'deep-brown': '#451A03',
                'subtle-black': '#1C1917'
            }
        },
    },
    plugins: [],
}
