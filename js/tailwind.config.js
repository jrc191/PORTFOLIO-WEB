tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#7f13ec",
                "secondary": "#0bda73",
                "accent": "#fbbf24",
                "alert": "#ef4444",
                "background-light": "#f7f6f8",
                "background-dark": "#0a0a0c",
                "surface-dark": "#16161a",
                "border-dark": "#2a2a35",
                "terminal-bg": "#0f0f12"
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "mono": ["Space Mono", "monospace"]
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #2a2a35 1px, transparent 1px), linear-gradient(to bottom, #2a2a35 1px, transparent 1px)",
            }
        },
    },
}