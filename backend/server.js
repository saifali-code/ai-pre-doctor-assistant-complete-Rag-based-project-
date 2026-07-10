/**
 * FILE: backend/server.js
 * PURPOSE: Entry point of the backend. Loads env vars, connects to MongoDB, starts the HTTP server.
 * CONNECTS TO:
 *   - src/app.js (the actual Express app with routes/middleware)
 *   - src/config/db.js (Mongo connection)
 *   - src/config/env.js (validated environment variables)
 * DATA FLOW: process boot -> connect DB -> start listening -> app.js handles all incoming requests.
 */

require("dotenv").config(); // Load .env into process.env

const app = require("./src/app");
const connectDB = require("./src/config/db");
const { PORT } = require("./src/config/env");

// Connect to MongoDB first, then start the server (fail fast if DB is unreachable).
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ AI Pre-Doctor backend running on port ${PORT}`);
  });
});

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" — React/Vite frontend, Node/Express + MongoDB backend,
 * Groq/Gemini LLM for a symptom-triage chatbot that ends in a downloadable PDF patient summary.
 * This file, backend/server.js, is the process entry point.
 * It depends on src/app.js (Express app), src/config/db.js (Mongo connect), src/config/env.js.
 * Nothing else imports this file — it's the top of the dependency tree, invoked via `npm start`/`npm run dev`.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds graceful shutdown (SIGINT/SIGTERM) closing the Mongo connection and HTTP server cleanly.
 *  2. Adds a process-level unhandledRejection/uncaughtException handler that logs via
 *     src/utils/logger.js and exits non-zero (don't swallow errors silently).
 *  3. Retries DB connection with backoff instead of a single attempt (useful for container restarts).
 *  4. Does NOT restructure app.js's exported shape or change route mounting — assume app.js keeps
 *     exporting a configured Express `app` instance.
 *  5. Keeps compatibility with `require("dotenv").config()` being called before any other import
 *     that reads process.env.
 */
