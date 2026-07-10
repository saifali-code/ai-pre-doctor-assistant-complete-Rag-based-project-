/**
 * FILE: frontend/postcss.config.js
 * PURPOSE: Wires Tailwind + Autoprefixer into the CSS build pipeline.
 * CONNECTS TO: processes src/index.css during `npm run dev` / `npm run build`.
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/postcss.config.js, is
 * boilerplate wiring for the CSS build pipeline (Tailwind + Autoprefixer), consumed
 * automatically by Vite during dev/build.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds cssnano for production minification if not already handled by Vite's default build.
 *  2. Confirms/documents whether any additional PostCSS plugins are worth adding for this
 *     project's needs (likely: none beyond Tailwind/Autoprefixer for an MVP — justify briefly).
 *  3. Keeps this as a minimal, low-maintenance file; do not introduce plugins that require
 *     matching changes in tailwind.config.js without calling that out.
 */
