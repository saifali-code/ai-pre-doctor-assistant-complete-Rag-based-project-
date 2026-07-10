/**
 * FILE: backend/src/config/env.js
 * PURPOSE: Central place that reads process.env and exports typed/validated config values.
 *   Every other backend file should read config from HERE, not directly from process.env,
 *   so there is one place to see/change all required environment variables.
 * CONNECTS TO: used by server.js, config/db.js, app.js, services/aiService.js, middleware/authMiddleware.js
 */

module.exports = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  MONGO_URI: process.env.MONGO_URI,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GROQ_MODEL: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET || "dev_only_insecure_secret",
};

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend (Node/Express/MongoDB). This file,
 * backend/src/config/env.js, is the single source of environment configuration, imported by
 * server.js, app.js, config/db.js, services/aiService.js, and middleware/authMiddleware.js.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Validates required vars at startup (MONGO_URI, GROQ_API_KEY, JWT_SECRET) and throws a
 *     clear error immediately if missing, instead of failing later with a confusing error.
 *  2. Uses a schema validator (e.g., zod or joi) to type-check and coerce values.
 *  3. Warns (not throws) if JWT_SECRET is the insecure dev default while NODE_ENV=production.
 *  4. Keeps the exact same exported key names, since many files destructure
 *     `{ PORT, CLIENT_URL, MONGO_URI, GROQ_API_KEY, GROQ_MODEL, GEMINI_API_KEY, JWT_SECRET }`
 *     from this module — do not rename keys without listing every consumer file to update.
 */
