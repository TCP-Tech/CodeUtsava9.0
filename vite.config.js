import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import crypto from "crypto";

// Polyfill for environments without crypto.hash()
if (!crypto.hash) {
  crypto.hash = (algo, data) =>
    crypto.createHash(algo).update(data).digest("hex");
}


export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: { dedupe: ['react', 'react-dom', 'react/jsx-runtime'] },
    optimizeDeps: {
        include: ['lenis'],        // helps Vite pre-bundle it
    },
    server: { allowedHosts: true },

});
