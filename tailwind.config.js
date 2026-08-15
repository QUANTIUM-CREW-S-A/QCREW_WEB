/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#050505", // Very dark background
          gray: "#141820", // Slightly lighter for cards
          primary: "#00D4FF", // Electric Blue
          secondary: "#8B5CF6", // Violet
          text: "#F5F6F7", // Light gray text
          muted: "#E5E7EB", // Muted text
        },
        // Paleta "plano": una elevacion de rack es un dibujo tecnico, y los
        // dibujos van sobre papel. Gris frio de plotter + tinta azul, no el
        // crema calido que trae cualquier plantilla.
        rack: {
          paper: "#EDEFF2", // fondo: papel de plano
          sheet: "#FFFFFF", // superficie de panel / tarjeta
          rule: "#CBD2D9",  // hairlines, rieles, retícula
          edge: "#9CA9B6",  // bordes en estado activo
          ink: "#101E2B",   // tinta: texto principal
          graph: "#5E6B77", // grafito: texto secundario (AA 4.77:1 sobre paper)
          link: "#0E8A6F",  // LED verde: enlace activo
          act: "#B26A08",   // LED ambar: actividad
          brand: "#0A6E96", // cian de marca, profundizado para fondo claro
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        // Grotesca industrial con eje de ancho: da el tono de equipo de red
        // sin caer en la geometrica redondeada de cualquier landing SaaS.
        rack: ['"Archivo"', '"Archivo Expanded"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "scroll": "scroll 60s linear infinite",
        "scroll-slow": "scroll 40s linear infinite",
        "blink": "blink 4s ease-in-out infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        // Parpadeo de LED de actividad: irregular a proposito, como el real
        "blink": {
          "0%, 45%, 55%, 100%": { opacity: 1 },
          "48%, 52%": { opacity: 0.25 },
        },
      },
    },
  },
  plugins: [],
};
