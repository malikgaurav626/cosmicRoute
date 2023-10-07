import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["three/examples/jsm/controls/orbitcontrols"],
  },
  build: {
    rollupOptions: {
      external: "^three/examples/jsm/controls/[^/]+$",
    },
  },
});
