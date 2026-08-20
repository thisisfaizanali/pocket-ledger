import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import twColors from "tailwindcss/colors"
const {nextui} = require("@nextui-org/react");

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
        fontFamily: {
            sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
            mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
        },
  		colors: {
            // Design tokens ("Ink & Gold Ledger") — see src/styles/globals.css
            // for the underlying HSL values (light + dark).
            background: 'hsl(var(--background) / <alpha-value>)',
            foreground: 'hsl(var(--foreground) / <alpha-value>)',
            card: {
                DEFAULT: 'hsl(var(--card) / <alpha-value>)',
                foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
            },
            popover: {
                DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
                foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
            },
            primary: {
                DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
                foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
            },
            secondary: {
                DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
                foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
            },
            muted: {
                DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
                foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
            },
            destructive: {
                DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
                foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
            },
            border: 'hsl(var(--border) / <alpha-value>)',
            input: 'hsl(var(--input) / <alpha-value>)',
            ring: 'hsl(var(--ring) / <alpha-value>)',
            positive: 'hsl(var(--positive) / <alpha-value>)',
            negative: 'hsl(var(--negative) / <alpha-value>)',
            'primary-tint': '#cbefd6',
            'primary-shade': '#a7d0b2',
            'secondary-tint': '#4c9d66',
            'secondary-shade': '#257339',
            'accentx': '#ea5166',
            'accent-tint': '#ed6b80',
            'accent-shade': '#d64259',
            // Tailwind's default neutral-50..950 grey scale, which every
            // shadcn/ui primitive (button, card, dialog, etc.) is built on.
            // Restored here because setting `neutral` to a bare hex below
            // used to clobber the whole scale, silently no-op'ing every
            // bg-neutral-*/text-neutral-* class shadcn ships with.
            neutral: {
                ...twColors.neutral,
                DEFAULT: '#fcf9e0',
            },
            'neutral-tint': '#fdfcf5',
            'neutral-shade': '#ece7d2',
            light: {
                50: '#fafcfd',  // Near-white, subtle
                100: '#f5f8fa',
                200: '#eaeef3',
                300: '#dde4eb',
                400: '#cbd5df',
                500: '#b8c3ce',  // Base light tone
                600: '#a1acb5',
                700: '#88949d',
                800: '#6f7b84',
                900: '#5c656e',  // Slightly deeper tone for contrast
            },
            dark: {
                50: '#f2f2f2',  // Off-white (for subtle uses)
                100: '#e6e6e6',
                200: '#cccccc',
                300: '#b3b3b3',
                400: '#808080',  // Neutral grey
                500: '#666666',  // Base dark tone
                600: '#4d4d4d',
                700: '#333333',
                800: '#1a1a1a',
                900: '#0d0d0d',  // Deep black-like grey
            },
            accent: {
                DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
                foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
                50: '#f0f7ff',  // Whisper blue
                100: '#dceeff',
                200: '#aad4ff',
                300: '#77baff',
                400: '#449eff',  // Bright sky blue
                500: '#0088ff',  // Base accent tone
                600: '#006bcc',
                700: '#005399',
                800: '#003c66',
                900: '#002533',  // Deep navy
            }
  		},
        borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
        },
        // backgroundImage: {
        //     'custom-gradient': 'linear-gradient(135deg, #e6eaef, #CDD5E0, #e6eaef)',
        // }
        backgroundImage: {
            gradient: 'linear-gradient(135deg, #E3E4E6, #FAECB7)',
            'custom-gradient': 'linear-gradient(135deg, #e6eaef, #CDD5E0, #e6eaef)',
            gradient2: 'linear-gradient(135deg, #9da9b9, #49535F)'
        }
  	}
  },
  plugins: [
        require("tailwindcss-animate"), 
        nextui()
    ],
} satisfies Config

export default config