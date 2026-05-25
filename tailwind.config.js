/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./js/**/*.{html,js}", "./products/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        'xs': 'clamp(0.65rem, 1vw + 0.4rem, 0.75rem)',
        'sm': 'clamp(0.75rem, 1.2vw + 0.4rem, 0.875rem)',
        'base': 'clamp(0.875rem, 1.5vw + 0.5rem, 1rem)',
        'lg': 'clamp(1rem, 2vw + 0.5rem, 1.125rem)',
        'xl': 'clamp(1.125rem, 2.5vw + 0.5rem, 1.25rem)',
        '2xl': 'clamp(1.25rem, 3vw + 0.5rem, 1.5rem)',
        '3xl': 'clamp(1.5rem, 4vw + 0.5rem, 1.875rem)',
        '4xl': 'clamp(1.75rem, 5vw + 0.5rem, 2.25rem)',
        '5xl': 'clamp(2rem, 6vw + 0.5rem, 3rem)',
        '6xl': 'clamp(2.25rem, 8vw + 0.5rem, 3.75rem)',
        '7xl': 'clamp(2.75rem, 10vw + 0.5rem, 4.5rem)',
        '8xl': 'clamp(3.25rem, 12vw + 0.5rem, 6rem)',
        '9xl': 'clamp(3.75rem, 14vw + 0.5rem, 8rem)',
      }
    },
  },
  plugins: [],
}
