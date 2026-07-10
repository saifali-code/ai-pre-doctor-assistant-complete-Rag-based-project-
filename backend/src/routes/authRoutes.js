/**
 * FILE: backend/src/routes/authRoutes.js
 * PURPOSE: Defines optional auth endpoints (register/login).
 * CONNECTS TO: mounted in src/app.js at "/api/auth"; delegates to controllers/authController.js.
 */

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/routes/authRoutes.js,
 * declares the optional auth endpoints, mounted at /api/auth in src/app.js, delegating to
 * controllers/authController.js's register/login handlers.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds request validation middleware (email format, required fields) before the controller.
 *  2. Adds a GET /me route wired to a new authController.getCurrentUser (guarded by
 *     middleware/authMiddleware.js) — coordinate with authController.js's own AI_PROMPT which
 *     proposes the same addition.
 *  3. Adds basic brute-force protection (rate limit on /login) given this is a public endpoint.
 *  4. Keeps POST /register and POST /login paths unchanged for backward compatibility.
 */
