/**
 * FILE: backend/src/models/PatientSummary.js
 * PURPOSE: The final structured output of a conversation — what gets shown on SummaryPage.jsx
 *   and turned into a PDF by pdfService.js.
 * CONNECTS TO:
 *   - controllers/chatController.js (creates this once AI decides enough info is gathered)
 *   - controllers/summaryController.js (fetches this by id to render/PDF-export it)
 *   - services/specialistMapper.js (fills recommendedSpecialist deterministically)
 *   - services/pdfService.js (reads this document's fields to lay out the PDF)
 * DATA FLOW: Session -> (AI extraction + specialistMapper) -> PatientSummary saved in Mongo
 *   -> frontend SummaryPage fetches via GET /api/summary/:id -> "Download PDF" hits
 *   GET /api/summary/:id/pdf which streams a PDF built from these exact fields.
 */

const mongoose = require("mongoose");

const patientSummarySchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    // Structured fields extracted from the conversation by the AI (see promptTemplates.js
    // for the exact JSON shape the LLM is instructed to return).
    primarySymptom: { type: String, required: true },
    durationDays: { type: Number, default: null },
    associatedSymptoms: { type: [String], default: [] },
    allergies: { type: String, default: "None reported" },
    medicalHistory: { type: String, default: "None reported" },
    severity: { type: String, enum: ["Mild", "Moderate", "Severe"], required: true },

    recommendedSpecialist: { type: String, required: true },
    disclaimer: {
      type: String,
      default:
        "This summary is AI-generated for informational purposes only and is not a medical diagnosis.",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientSummary", patientSummarySchema);

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/models/PatientSummary.js,
 * is the structured, patient-facing output of a triage conversation. It is created by
 * controllers/chatController.js once the Session's status becomes "ready_to_summarize" (data
 * comes from the LLM's JSON extraction defined in services/promptTemplates.js, validated, and
 * cross-checked by services/specialistMapper.js for recommendedSpecialist). It is read by
 * controllers/summaryController.js for both the JSON API response (SummaryPage.jsx renders it)
 * and the PDF export (services/pdfService.js lays these exact fields into a PDF document).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds schema-level validation (e.g., durationDays >= 0, primarySymptom max length) and
 *     a pre-save hook that guarantees recommendedSpecialist is always one of the SPECIALISTS
 *     enum from shared/constants.js (import/replicate that list here).
 *  2. Adds a `redFlag: Boolean` and `redFlagReason: String` pair for emergency cases, consistent
 *     with the equivalent field added to Session.js.
 *  3. Adds an index on sessionId (unique) since one session should produce at most one summary,
 *     and on userId + createdAt for a future "history" list view (HistoryPage.jsx).
 *  4. Keeps every existing field name unchanged (primarySymptom, durationDays,
 *     associatedSymptoms, allergies, medicalHistory, severity, recommendedSpecialist,
 *     disclaimer) since summaryController.js, pdfService.js, and SummaryCard.jsx all destructure
 *     these exact keys.
 */
