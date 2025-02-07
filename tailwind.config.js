/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"], 
      },
      backgroundImage: {
        'login-bg': "url('./src/assets/logn-bg.svg')",
        'dashboard-vector': "url('./src/assets/dashboard-vector.svg')",
      },
      colors: {
        primary: "#199FB1",  
        lightGray: "#7F7F7F",  
        orange: "#FF8553",

      },
    },
  },
  plugins: [],
};
