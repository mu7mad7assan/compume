/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': "url('/src/assets/login_background.svg')",
        'login-svg': "url('/src/assets/login_photo.svg')"
      },
      colors: {
        'main-color': '#6c2dd0',
        'light-color': '#c9e0f1',
        'main-light': '#8554e1',
        'dark-color': '#44348c',
        'button-burble': '#b816b7',
        'button-orange': '#fca48c'
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      container: {
        center: true
      }
    }
  },
  plugins: []
};
