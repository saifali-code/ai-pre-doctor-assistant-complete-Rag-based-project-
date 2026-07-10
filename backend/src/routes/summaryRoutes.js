/**
 * FILE: backend/src/routes/summaryRoutes.js
 * PURPOSE: Defines HTTP routes for fetching a summary and downloading its PDF.
 * CONNECTS TO: mounted in src/app.js at "/api/summary"; delegates to controllers/summaryController.js.
 */

const express = require("express");
const router = express.Router();
const { getSummary, downloadSummaryPDF } = require("../controllers/summaryController");

// GET /api/summary/:id -> JSON PatientSummary (used by SummaryPage.jsx)
router.get("/:id", getSummary);

// GET /api/summary/:id/pdf -> streams a PDF file (used by the "Download PDF" button)
router.get("/:id/pdf", downloadSummaryPDF);

module.exports = router;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/routes/summaryRoutes.js,
 * declares the summary endpoints, mounted at /api/summary in src/app.js, delegating to
 * controllers/summaryController.js. Frontend's SummaryPage.jsx calls GET /api/summary/:id on
 * load and GET /api/summary/:id/pdf when the user clicks download.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds param validation for :id (must be a valid Mongo ObjectId) with a clean 400 before
 *     hitting the controller/DB.
 *  2. Optionally adds middleware/authMiddleware.js on these routes once account-based
 *     authorization is implemented in summaryController.js (per that file's AI_PROMPT), while
 *     keeping guest-by-link access working as documented there.
 *  3. Keeps both existing route paths (GET /:id, GET /:id/pdf) and their controller wiring
 *     unchanged for backward compatibility with the current frontend.
 */
