import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ✅ Backend (prod) – confirmed API base
const PROD_API_URL = "https://tltours-ai-tour-creator-38ef6793c643.herokuapp.com";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Hit your API services exactly as exposed by backend
      "/tour-generation": { target: PROD_API_URL, changeOrigin: true, secure: true },
      "/tour-guides":     { target: PROD_API_URL, changeOrigin: true, secure: true },
      "/tour-auth":       { target: PROD_API_URL, changeOrigin: true, secure: true },

      // Optional: generic /api passthrough with NO rewrite
      "/api": { target: PROD_API_URL, changeOrigin: true, secure: true },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  define: { __APP_ENV__: JSON.stringify(mode) },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "tour-api": [
            "./src/utils/api/client/tour.client.ts",
            "./src/utils/api/services/tour-generation.service.ts",
            "./src/utils/api/services/tour-guides.service.ts",
          ],
        },
      },
    },
  },
  optimizeDeps: { include: ["react", "react-dom"] },
}));