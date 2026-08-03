/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Three palettes drawn from the THEME reference moodboard, one per
        // volume, plus a shared void/starlight neutral base used everywhere.
        // Bronze/gold — Volume 1, Classical Physics
        auric: {
          100: '#F3E9DA',
          300: '#DCB55F',
          500: '#AF9C80',
          700: '#6F4E37',
          900: '#1A1512',
        },
        // Emerald/teal — Volume 2, Quantum Physics
        verdant: {
          100: '#DFF6EA',
          300: '#89DEC6',
          500: '#3C9A81',
          700: '#1C443B',
          900: '#0B1F1A',
        },
        // Indigo/violet — Volume 3, Black Hole Physics
        nebula: {
          100: '#B9B4C4',
          300: '#8C86A0',
          500: '#635A6B',
          700: '#43384D',
          900: '#0A0D21',
        },
        // Accretion-disk blue + supernova red — rare high-energy accents
        eventblue: { 300: '#8FD6F0', 500: '#2DA0DA', 700: '#1B5C82' },
        nova: { 300: '#E0637C', 500: '#9F253D', 700: '#6E1A2B' },

        // shadcn-style semantic tokens, bound to CSS variables defined in
        // index.css so bg-card / text-muted-foreground / border-border etc.
        // resolve to the single dark cosmic theme (no light mode).
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--popover) / <alpha-value>)',
          foreground: 'rgb(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        'sans': ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif': ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        'mono': ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'drift': {
          '0%': { transform: 'translate(0,0) rotate(0deg)' },
          '100%': { transform: 'translate(-40px, 30px) rotate(8deg)' },
        },
        'blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-slide-up': 'fade-slide-up 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'drift-slow': 'drift 40s ease-in-out infinite alternate',
        'blink': 'blink 1s step-end infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
