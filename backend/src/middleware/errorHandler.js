/**
 * FILE: backend/src/middleware/errorHandler.js
 * PURPOSE: Single place that catches every error passed via next(err) from any controller and
 *   returns a consistent JSON error response instead of leaking stack traces to the client.
 * CONNECTS TO: registered last in src/app.js; every controller calls next(err) on failure.
 */

function errorHandler(err, req, res, next) {
  console.error(err); // TODO: replace with utils/logger.js in production
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
}

module.exports = errorHandler;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/middleware/errorHandler.js,
 * is the final Express error-handling middleware, registered last in src/app.js. Every
 * controller (chatController.js, summaryController.js, authController.js) calls `next(err)` on
 * failure, which routes here.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Uses utils/logger.js instead of console.error, including structured context (request
 *     path, method, userId if present).
 *  2. Distinguishes known operational errors (validation errors, 404s with a statusCode set) from
 *     unexpected programmer errors, and never leaks internal error messages/stack traces for the
 *     latter in production (generic "Something went wrong" instead).
 *  3. Handles specific known error types distinctly: Mongoose ValidationError -> 400 with field
 *     details, Mongoose CastError (bad ObjectId) -> 400, JWT errors -> 401.
 *  4. Keeps the Express 4-argument error-middleware signature `(err, req, res, next)` and stays
 *     registered as the LAST app.use() in src/app.js, since Express requires that positioning
 *     to be recognized as an error handler.
 */
