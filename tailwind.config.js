
export default {
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './lib/**/*.{js,ts,jsx,tsx}',
],
  theme: {
    extend: {
      colors: {
        ink: '#0D0D0D',
        bone: '#F5F3EE',
        sand: '#E8E2D5',
        gold: '#B8935A',
        charcoal: '#2A2A28',
        earth: '#5C4A3A',
        iris: '#6B5B95',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
