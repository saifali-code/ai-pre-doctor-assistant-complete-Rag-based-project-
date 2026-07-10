/**
 * FILE: frontend/vite.config.js
 * PURPOSE: Vite build/dev-server configuration.
 * CONNECTS TO: enables the React plugin used by every .jsx file in src/.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend (React + Vite + Tailwind, talking to an Express
 * backend). This file, frontend/vite.config.js, configures the build tool for the whole
 * frontend app.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds a dev-server proxy for /api -> VITE_API_URL target to avoid CORS friction locally
 *     if desired (weigh vs current direct-CORS approach in backend/src/app.js — pick one and
 *     document why).
 *  2. Adds build optimizations (chunk splitting, sourcemap toggling per environment).
 *  3. Adds path aliases (e.g., "@/" -> "src/") if it meaningfully simplifies the many relative
 *     imports across components/pages/hooks — update note that jsconfig/tsconfig-like alias
 *     resolution would need matching config if TypeScript is introduced later.
 *  4. Keeps the React plugin and dev port (5173) consistent with backend's CLIENT_URL default
 *     in backend/.env.example, or clearly flags the change needed on the backend side if the
 *     port changes.
 */
