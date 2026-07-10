/**
 * FILE: backend/src/config/db.js
 * PURPOSE: Establishes the MongoDB connection using Mongoose.
 * CONNECTS TO: called once from server.js at boot. Once connected, all files in models/ can
 *   define schemas and all controllers/services can query the DB.
 */

const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // fail fast — no point running the API without a DB
  }
}

module.exports = connectDB;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/config/db.js, sets up
 * the MongoDB (Mongoose) connection. It is called once from server.js before the HTTP server
 * starts listening. Models in backend/src/models/ (Session.js, PatientSummary.js, User.js)
 * rely on this connection being established first.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds connection event listeners (on('error'), on('disconnected')) for observability,
 *     logging via utils/logger.js instead of console.
 *  2. Adds retry-with-backoff logic instead of process.exit(1) on first failure, useful for
 *     container orchestration platforms (Render/Railway) that restart on crash anyway — decide
 *     and justify which strategy fits a small free-tier deployment.
 *  3. Sets sensible Mongoose connection options (maxPoolSize, serverSelectionTimeoutMS) tuned
 *     for a low-traffic MVP on a free Atlas M0 cluster.
 *  4. Keeps exporting a single async function `connectDB` with no arguments, since server.js
 *     calls it as `connectDB().then(...)`.
 */
