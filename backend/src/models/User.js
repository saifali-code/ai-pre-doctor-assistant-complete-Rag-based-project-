/**
 * FILE: backend/src/models/User.js
 * PURPOSE: Optional account system (MVP can run entirely guest/session-based without this being
 *   used at all — it exists so v2 "save my summary history" login feature has a home).
 * CONNECTS TO:
 *   - controllers/authController.js (register/login create & verify User documents)
 *   - middleware/authMiddleware.js (verifies JWT and attaches req.user from this model)
 *   - models/Session.js / PatientSummary.js (optional userId reference when logged in)
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/models/User.js, is the
 * optional account model. It's used by controllers/authController.js (register/login, hashing
 * passwords with bcryptjs before saving as passwordHash) and middleware/authMiddleware.js
 * (verifies a JWT whose payload contains this user's _id, then loads the User to attach to
 * req.user). models/Session.js and models/PatientSummary.js optionally reference userId to
 * this model when a patient is logged in (guest sessions leave userId null).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds email format validation and a compound unique index on email.
 *  2. Adds optional fields useful for a health app account: dateOfBirth, gender (for more
 *     accurate specialist mapping, e.g., Gynecologist relevance), preferredLanguage (for future
 *     Urdu/Roman Urdu support mentioned in ARCHITECTURE.md roadmap).
 *  3. Never stores or exposes plaintext password — keep the passwordHash field name and ensure
 *     it's excluded by default from queries (select: false) with the ability to explicitly
 *     `.select('+passwordHash')` in authController.js's login flow (call out that
 *     authController.js needs that one-line update).
 *  4. Keeps the model name "User" and field names (name, email, passwordHash) unchanged since
 *     authController.js and authMiddleware.js reference them directly.
 */
