/**
 * FILE: backend/src/controllers/summaryController.js
 * PURPOSE: Fetches a PatientSummary for display, and generates/streams its PDF version.
 * CONNECTS TO:
 *   - routes/summaryRoutes.js (GET /api/summary/:id and GET /api/summary/:id/pdf)
 *   - models/PatientSummary.js
 *   - services/pdfService.js
 * DATA FLOW: frontend SummaryPage.jsx loads -> GET /api/summary/:id -> renders SummaryCard.jsx.
 *   User clicks "Download PDF" -> GET /api/summary/:id/pdf -> browser downloads the file.
 */

const PatientSummary = require("../models/PatientSummary");
const { generateSummaryPDF } = require("../services/pdfService");

async function getSummary(req, res, next) {
  try {
    const summary = await PatientSummary.findById(req.params.id);
    if (!summary) return res.status(404).json({ error: "Summary not found" });
    res.json(summary);
  } catch (err) {
    next(err);
  }
}

async function downloadSummaryPDF(req, res, next) {
  try {
    const summary = await PatientSummary.findById(req.params.id);
    if (!summary) return res.status(404).json({ error: "Summary not found" });

    const pdfBytes = await generateSummaryPDF(summary);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=summary-${summary._id}.pdf`);
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    next(err);
  }
}

module.exports = { getSummary, downloadSummaryPDF };

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/controllers/summaryController.js,
 * serves a finalized triage result. It's mounted by routes/summaryRoutes.js at GET
 * /api/summary/:id (consumed by frontend SummaryPage.jsx to render SummaryCard.jsx +
 * SpecialistBadge.jsx) and GET /api/summary/:id/pdf (consumed by a "Download PDF" button, which
 * calls services/pdfService.js generateSummaryPDF()). Data originates from
 * models/PatientSummary.js, created earlier by controllers/chatController.js.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds authorization: if a summary has a non-null userId, only that user (via
 *     middleware/authMiddleware.js req.user) or an admin may fetch it; guest (userId: null)
 *     summaries remain fetchable by id only (treat the id itself as the shareable secret, like
 *     an unlisted link) — document this security tradeoff for the MVP.
 *  2. Adds a "share" endpoint/response variant that returns a public-safe subset of fields for
 *     sharing with a doctor without exposing internal ids or timestamps.
 *  3. Adds caching headers appropriately for the PDF route (it's static once generated) or
 *     documents why not to cache (data could theoretically be regenerated/edited later).
 *  4. Keeps both exported function names (getSummary, downloadSummaryPDF) and their Express
 *     (req, res, next) signature and current route paths/params (:id) unchanged, since
 *     routes/summaryRoutes.js and the frontend URLs depend on this exact contract.
 */
