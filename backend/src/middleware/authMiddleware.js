/**
 * FILE: backend/src/middleware/authMiddleware.js
 * PURPOSE: Verifies a JWT from the Authorization header and attaches the decoded user to
 *   req.user. Optional for MVP (guest flow doesn't need it) — used once routes are protected.
 * CONNECTS TO:
 *   - config/env.js (JWT_SECRET)
 *   - can be applied to any route in routes/*.js that should require login
 */

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId }
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = requireAuth;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/middleware/authMiddleware.js,
 * verifies JWTs issued by controllers/authController.js and attaches `req.user` for any route
 * that needs to know the logged-in user (e.g., future protected routes in summaryRoutes.js /
 * chatRoutes.js per those files' AI_PROMPT suggestions).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Optionally loads the full models/User.js document (not just the JWT payload) onto
 *     req.user when downstream code needs more than userId, with a lean/cache-friendly query.
 *  2. Adds an `optionalAuth` variant that attaches req.user if a valid token is present but
 *     does NOT reject the request if it's missing/invalid (useful for routes that support both
 *     guest and logged-in access, like summaryController.js's getSummary).
 *  3. Adds clear error differentiation (expired vs malformed vs missing token) in the JSON
 *     response for better frontend UX.
 *  4. Keeps the default export's behavior contract (reads Bearer token from Authorization
 *     header, verifies with JWT_SECRET, sets req.user, calls next() or responds 401) unchanged
 *     so any route currently using `router.use(requireAuth)` or `router.get(path, requireAuth,
 *     handler)` keeps working.
 */
