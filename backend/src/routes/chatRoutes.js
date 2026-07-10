/**
 * FILE: backend/src/routes/chatRoutes.js
 * PURPOSE: Defines the HTTP route(s) for the chat feature and wires them to chatController.js.
 * CONNECTS TO: mounted in src/app.js at "/api/chat"; delegates to controllers/chatController.js.
 */

const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/chatController");

// POST /api/chat/message  { sessionId?, message } -> { sessionId, type, text?/summaryId? }
router.post("/message", sendMessage);

module.exports = router;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/routes/chatRoutes.js,
 * declares the chat endpoint(s), mounted at /api/chat in src/app.js, delegating to
 * controllers/chatController.js's sendMessage handler. Frontend's src/api/client.js calls
 * POST /api/chat/message.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds a lightweight per-IP or per-session rate limiter middleware specifically on this
 *     route (chat triggers LLM calls, the most expensive operation in the system).
 *  2. Adds a route-level request body validation middleware (e.g., express-validator or a
 *     small custom check) before hitting the controller.
 *  3. Adds a GET /api/chat/session/:id route (new controller method reference) to fetch a
 *     session's message history for page-refresh resilience on the frontend — note this
 *     requires a corresponding new export in chatController.js.
 *  4. Keeps the existing POST /api/chat/message path and handler wiring unchanged for backward
 *     compatibility with the current frontend.
 */
