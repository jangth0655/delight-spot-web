import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        sm: '22.5rem',
        md: '48rem',
      },
      screens: {
        sm: '22.5rem',
        md: '48rem',
      },
      minWidth: {
        sm: '22.5rem',
        md: '48rem',
      },
      maxWidth: {
        sm: '22.5rem',
        md: '48rem',
      },
      fontSize: {
        display: '3.5rem',
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.5rem',
        h4: '1.25rem',
        body: '1rem',
        'body-s': '0.875rem',
        label: '0.75rem',
        subtitle: '1rem',
        caption: '0.625rem',
      },
      lineHeight: {
        display: '4rem',
        h1: '3rem',
        h2: '2.5rem',
        h3: '2rem',
        h4: '1.75rem',
        body: '1.5rem',
        subtitle: '1rem',
        'body-s': '1.25rem',
        label: '1rem',
        caption: '0.875rem',
      },
      fontWeight: {
        black: '900',
        bold: '700',
        regular: '400',
      },
      colors: {
        primary: {
          P500: '#000EAA',
          P400: '#1B35C7',
          P300: '#2D47DB',
          P200: '#3C5BEA',
          P100: '#5770F2',
        },
        slate: {
          S900: '#03040D',
          S800: '#0D1027',
          S700: '#12162A',
          S600: '#2C3249',
          S500: '#565978',
          S400: '#797D9E',
          S300: '#C8C9DF',
          S200: '#EEF1FF',
          S100: '#ffffff',
        },
        system: {
          S600: '#5CFF63',
          S500: '#00A007',
          S400: '#FFBD53',
          S300: '#AB6A00',
          S200: '#FF5F5F',
          S100: '#DE0000',
        },
      },
    },
  },
  plugins: [],
};
export default config;
