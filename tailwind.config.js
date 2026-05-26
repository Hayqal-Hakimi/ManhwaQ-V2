/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      /* ── Modern Parchment Design Tokens ── */
      colors: {
        parchment: {
          DEFAULT: '#fcf9f8',
          dim: '#dcd9d9',
          bright: '#fcf9f8',
        },
        surface: {
          DEFAULT: '#fcf9f8',
          lowest: '#ffffff',
          low: '#f6f3f2',
          container: '#f0eded',
          high: '#eae7e7',
          highest: '#e4e2e1',
          variant: '#e4e2e1',
          tint: '#4f6263',
        },
        primary: {
          DEFAULT: '#455859',
          container: '#5d7071',
          fixed: '#d2e6e7',
          'fixed-dim': '#b6cacb',
        },
        secondary: {
          DEFAULT: '#78583a',
          container: '#fed2ac',
          fixed: '#ffdcbf',
          'fixed-dim': '#e9bf9a',
        },
        tertiary: {
          DEFAULT: '#674f44',
          container: '#81675b',
          fixed: '#fddccd',
          'fixed-dim': '#e0c0b2',
        },
        ink: '#252525',
        carbon: '#1b1c1c',
        outline: {
          DEFAULT: '#727878',
          variant: '#c2c8c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Hanken Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['40px', { lineHeight: '1.2', letterSpacing: '0.01em', fontWeight: '800' }],
        'headline-md': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '800' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-bold': ['14px', { lineHeight: '1.2', fontWeight: '700' }],
      },
      spacing: {
        'grid-gutter': '24px',
        'margin-mobile': '16px',
        'margin-desktop': '64px',
      },
      borderRadius: {
        sm: '0.5rem',
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      boxShadow: {
        'inked': '4px 4px 0px 0px #000',
        'inked-sm': '2px 2px 0px 0px #000',
        'inked-lg': '8px 8px 0px 0px #000',
        'inked-hover': '2px 2px 0px 0px #000',
        'inked-sidebar': '4px 0 0 0 #000',
      },
      maxWidth: {
        'layout': '1280px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
