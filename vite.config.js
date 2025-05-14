import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        panel: path.resolve(__dirname, "index.html"),
        background: path.resolve(__dirname, "src/background.jsx"),
        contentScript: path.resolve(__dirname, "src/contentScript.jsx"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
