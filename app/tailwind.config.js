const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      crosshair: 'crosshair',
      'zoom-in': 'zoom-in',
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
      'center-bottom': 'center bottom',
    },
    extend: {
      keyframes: {
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 1s ease-out forwards',
      },
      flex: {
        '9': '9 9 0%',
        '3': '3 3 0%',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
        green: colors.green,
        indigo: colors.indigo,
        yellow: colors.amber,
        purple: colors.violet,
        // Ensure default green is included
        // Custom colors for light mode
        primary: "#3490dc",
        secondary: "#ffed4a",
        accent: "#38b2ac",
        background: "#f7fafc",
        text: "#2d3748",
        "gray-850": '#1f2932',
        'gray-950': '#0f172a',
        'gray-1000': '#0a0e1a',
        'custom-dark': '#0b0d16',
        // Custom colors for dark mode
        "dark-background": "#1a202c",
        "dark-text": "#cbd5e0",
        "dark-primary": "#63b3ed",
        "dark-secondary": "#faf089",
        "dark-accent": "#4fd1c5",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      height: {
        '100': '25rem',
        '110': '27.5rem',
        '120': '30rem',
        '130': '32.5rem',
        '140': '35rem',
        '150': '37.5rem',
        '160': '40rem',
        '170': '42.5rem',
        '180': '45rem',
        '190': '47.5rem',
        '200': '50rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
