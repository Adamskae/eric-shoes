/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Surfaces
        bone: '#F2EADB',     // warm cream — primary page bg
        cream: '#F8F1E2',    // lighter card surface
        oxide: '#1A1410',    // primary ink
        smoke: '#2A2520',
        void: '#0E0B08',

        // Vibrant accents
        flame: '#FF4D2E',    // Nike-leaning vivid red-orange
        cobalt: '#1F4DE6',   // Adidas-leaning electric blue
        ember: '#E08534',    // Jordan-leaning warm orange
        lime:  '#A6D34A',    // New Balance-leaning sage-lime
        acid:  '#D8FF3B',    // headline accent
        cyber: '#00D2E0',
        magenta: '#FF2E93',
      },
      letterSpacing: {
        crush: '-0.06em',
        cut: '-0.04em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
