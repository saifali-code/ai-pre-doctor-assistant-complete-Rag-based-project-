/**
 * FILE: backend/src/utils/logger.js
 * PURPOSE: Tiny logging wrapper so the rest of the codebase never calls console.log directly —
 *   makes it trivial to swap in a real logger (pino/winston) later in one place.
 * CONNECTS TO: intended to be imported by config/db.js, middleware/errorHandler.js, server.js,
 *   and any service that needs to log (currently most files still use console.* directly as
 *   placeholders — the AI_PROMPT below is where that gets cleaned up).
 */

const logger = {
  info: (...args) => console.log("[INFO]", ...args),
  error: (...args) => console.error("[ERROR]", ...args),
  warn: (...args) => console.warn("[WARN]", ...args),
};

module.exports = logger;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/utils/logger.js, is meant
 * to be the single logging abstraction used across server.js, config/db.js,
 * middleware/errorHandler.js, and any services/controllers that currently use console.* as a
 * placeholder (see their AI_PROMPT comments referencing "logger.js").
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Replaces the console wrapper with a real structured logger (pino recommended for
 *     performance) producing JSON logs suitable for Render/Railway log viewers.
 *  2. Adds log levels controlled by an env var (LOG_LEVEL) read via config/env.js (note the
 *     one-line addition config/env.js would need).
 *  3. Adds request-scoped child loggers (e.g., include a request id) for correlating logs across
 *     a single HTTP request when wired into src/app.js via pino-http.
 *  4. Keeps exporting an object with at least `info`, `error`, `warn` methods with the same
 *     `(...args)` call signature, since consumers currently call `logger.info(...)`,
 *     `logger.error(...)`, `logger.warn(...)` positionally without named options.
 */
