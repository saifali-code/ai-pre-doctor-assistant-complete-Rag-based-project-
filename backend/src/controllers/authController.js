/**
 * FILE: backend/src/controllers/authController.js
 * PURPOSE: Optional account system — register/login. NOT required for MVP (guest sessions work
 *   fine without this), but scaffolded here for the v2 "save my history" feature.
 * CONNECTS TO:
 *   - routes/authRoutes.js (POST /api/auth/register, POST /api/auth/login)
 *   - models/User.js
 *   - middleware/authMiddleware.js (issues/verifies the JWT this controller creates)
 */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { JWT_SECRET } = require("../config/env");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/controllers/authController.js,
 * is the optional v2 account system, mounted by routes/authRoutes.js. It creates/verifies
 * models/User.js documents and issues JWTs consumed by middleware/authMiddleware.js on
 * subsequent authenticated requests (e.g., to attach userId to Session/PatientSummary in
 * chatController.js/summaryController.js).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds input validation (email format, password strength/min length) with clear 400 errors.
 *  2. Adds duplicate-email handling (catch Mongo's E11000 unique index error) with a clean
 *     409 Conflict response instead of a raw 500.
 *  3. Moves token expiry and bcrypt salt rounds into config/env.js instead of magic numbers.
 *  4. Adds a `me`/`getCurrentUser` handler (GET /api/auth/me) that uses
 *     middleware/authMiddleware.js's req.user to return the logged-in user's basic profile.
 *  5. Keeps the exported function names `register` and `login` and their (req, res, next)
 *     signature and JSON response shape `{ token }` unchanged, since routes/authRoutes.js and
 *     the frontend auth flow (if built later) depend on this exact contract.
 */
