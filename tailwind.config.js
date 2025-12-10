/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'brand-purple': '#662d91',
                'brand-purple-light': '#9d6adf',
                'brand-lemon': '#bcd630',
            },
        },
    },
    plugins: [],
};

