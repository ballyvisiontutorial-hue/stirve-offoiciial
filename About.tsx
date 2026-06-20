@import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Inter:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-display: 'Archivo', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --color-accent: #a3e635;
  --color-accent-dim: #84cc16;
  --color-ink: #0A0A0B;
  --color-ink-soft: #131316;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #0A0A0B;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #0A0A0B;
  color: #fff;
}

/* Premium scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0A0A0B;
}
::-webkit-scrollbar-thumb {
  background: #2a2a2e;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3a3a3e;
}

/* Display font utility */
.font-display {
  font-family: 'Archivo', system-ui, sans-serif;
}

/* Selection color */
::selection {
  background: #a3e635;
  color: #000;
}

/* Focus visible for accessibility */
*:focus-visible {
  outline: 2px solid #a3e635;
  outline-offset: 2px;
}

/* Premium shimmer loading */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.shimmer {
  background: linear-gradient(90deg, #131316 25%, #1e1e22 50%, #131316 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Hide scrollbar for filter rows on mobile */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Film grain overlay for cinematic sections */
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.04;
  z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Smooth image rendering */
img {
  -webkit-user-drag: none;
  user-select: none;
}

/* Prevent layout shift on video */
video {
  background: #0A0A0B;
}
