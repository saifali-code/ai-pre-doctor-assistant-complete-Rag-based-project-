/**
 * FILE: backend/src/app.js
 * PURPOSE: Configures the Express application — middleware, route mounting, error handling.
 * CONNECTS TO:
 *   - routes/chatRoutes.js, routes/summaryRoutes.js, routes/authRoutes.js (all API endpoints)
 *   - middleware/errorHandler.js (final error catch-all)
 *   - config/env.js (CLIENT_URL for CORS)
 * DATA FLOW: server.js imports and starts this app -> every HTTP request enters here first
 *   -> global middleware (cors, json parsing) -> matched route -> controller -> response.
 */

const express = require("express");
const cors = require("cors");
const { CLIENT_URL } = require("./config/env");

const chatRoutes = require("./routes/chatRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// --- Global middleware ---
app.use(cors({ origin: CLIENT_URL, credentials: true })); // allow frontend origin only
app.use(express.json()); // parse JSON request bodies

// --- Health check (useful for Render/Railway uptime checks) ---
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// --- Route mounting ---
app.use("/api/chat", chatRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/auth", authRoutes);

// --- Catch-all error handler (must be last) ---
app.use(errorHandler);

module.exports = app;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" (React frontend, Node/Express + MongoDB backend,
 * Groq/Gemini for AI chat, pdf-lib for PDF summaries). This file, backend/src/app.js, wires
 * together all Express middleware and routes. It is imported only by server.js.
 * It imports routes/chatRoutes.js, routes/summaryRoutes.js, routes/authRoutes.js and
 * middleware/errorHandler.js. Route files import their respective controllers.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds security middleware: helmet, rate limiting (express-rate-limit) especially on
 *     /api/chat since it triggers paid-adjacent LLM calls, and request size limits.
 *  2. Adds structured request logging (morgan or pino-http) wired to utils/logger.js.
 *  3. Adds a 404 handler for unmatched routes before errorHandler.
 *  4. Keeps the same route mount paths (/api/chat, /api/summary, /api/auth, /api/health) since
 *     the frontend's src/api/client.js is hardcoded to call these paths — do not rename them
 *     without also flagging the frontend file that must change.
 *  5. Do not add new routes or business logic here — this file only wires middleware/routes;
 *     actual logic belongs in controllers/services.
 */
