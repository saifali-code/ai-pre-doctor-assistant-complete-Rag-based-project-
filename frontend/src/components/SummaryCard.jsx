/**
 * FILE: frontend/src/components/SummaryCard.jsx
 * PURPOSE: Displays the structured patient summary (mirrors the example in the project brief:
 *   Fever, Cough, Severity, Recommended Specialist, etc.).
 * CONNECTS TO: used by pages/SummaryPage.jsx; receives a `summary` object matching the backend's
 *   PatientSummary model (models/PatientSummary.js) fields; uses SpecialistBadge.jsx.
 */
import SpecialistBadge from "./SpecialistBadge.jsx";

function SummaryCard({ summary }) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-2">
      <h2 className="text-xl font-semibold mb-2">Patient Summary</h2>
      <p><strong>Primary Symptom:</strong> {summary.primarySymptom}</p>
      <p><strong>Duration:</strong> {summary.durationDays ?? "Not provided"} day(s)</p>
      <p><strong>Associated Symptoms:</strong> {summary.associatedSymptoms.join(", ") || "None"}</p>
      <p><strong>Allergies:</strong> {summary.allergies}</p>
      <p><strong>Severity:</strong> {summary.severity}</p>
      <div className="pt-2">
        <SpecialistBadge specialist={summary.recommendedSpecialist} />
      </div>
      <p className="text-xs text-gray-500 pt-4">{summary.disclaimer}</p>
    </div>
  );
}

export default SummaryCard;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file,
 * frontend/src/components/SummaryCard.jsx, is the main visual output of the whole product —
 * used by pages/SummaryPage.jsx, receiving a `summary` prop that is the JSON returned from
 * GET /api/summary/:id (backend controllers/summaryController.js, matching
 * backend/src/models/PatientSummary.js field names exactly: primarySymptom, durationDays,
 * associatedSymptoms, allergies, medicalHistory, severity, recommendedSpecialist, disclaimer).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds a polished, print/PDF-preview-like card design (since this is the "hero" screen users
 *     screenshot/share) with clear visual hierarchy and a severity color indicator matching
 *     tailwind.config.js's proposed severity color scale.
 *  2. Displays `medicalHistory` (currently missing from the rendered fields) alongside the
 *     others.
 *  3. Adds loading/empty/error state handling if `summary` is null/undefined while
 *     SummaryPage.jsx is still fetching.
 *  4. Keeps the prop name `summary` and expects the exact same field names listed above,
 *     since it's a direct pass-through of the backend's PatientSummary JSON with no
 *     transformation layer currently — if you add a transform, do it in SummaryPage.jsx, not
 *     silently here.
 */
