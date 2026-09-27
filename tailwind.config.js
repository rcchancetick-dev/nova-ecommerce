/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0a0a0f",
        aurora: {
          violet: "#8b5cf6",
          fuchsia: "#d946ef",
          cyan: "#22d3ee",
          amber: "#fbbf24"
        }
      },
      fontFamily: {
        display: ["'Clash Display'", "Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      backgroundImage: {
        "aurora-gradient": "radial-gradient(circle at 20% 20%, rgba(139,92,246,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(217,70,239,0.3), transparent 45%), radial-gradient(circle at 50% 100%, rgba(34,211,238,0.25), transparent 40%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")"
      },
      boxShadow: {
        glow: "0 0 40px rgba(139,92,246,0.35)",
        "glow-lg": "0 0 80px rgba(139,92,246,0.4)"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite"
      }
    }
  },
  plugins: []
};
