/**
 * FILE: backend/src/services/specialistMapper.js
 * PURPOSE: Deterministic, rule-based safety net over the LLM's proposed specialist. The AI
 *   suggests a specialist inside its JSON summary, but this function can OVERRIDE it for
 *   safety-critical patterns (e.g., always force "Emergency Care" for red-flag symptoms),
 *   so the product never relies 100% on LLM judgement for something safety-relevant.
 * CONNECTS TO:
 *   - controllers/chatController.js (calls this right before saving a PatientSummary)
 *   - models/PatientSummary.js (recommendedSpecialist field is the output of this function)
 */

const VALID_SPECIALISTS = [
  "General Physician",
  "ENT Specialist",
  "Pulmonologist",
  "Cardiologist",
  "Gastroenterologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Gynecologist",
  "Pediatrician",
  "Emergency Care",
];

/**
 * Takes the AI-proposed summary object and returns a final, validated specialist string.
 * Very small rule set for now — expand heavily in the AI_PROMPT-generated version.
 */
function mapToSpecialist(summaryData) {
  const { severity, primarySymptom = "", recommendedSpecialist } = summaryData;
  const symptomLower = primarySymptom.toLowerCase();

  if (severity === "Severe" && (symptomLower.includes("chest") || symptomLower.includes("breath"))) {
    return "Emergency Care";
  }

  if (VALID_SPECIALISTS.includes(recommendedSpecialist)) {
    return recommendedSpecialist;
  }

  return "General Physician"; // safe default when AI gives an invalid/unknown label
}

module.exports = { mapToSpecialist, VALID_SPECIALISTS };

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/services/specialistMapper.js,
 * is the deterministic safety layer that finalizes `recommendedSpecialist` before a
 * models/PatientSummary.js is saved. It's called from controllers/chatController.js right after
 * services/aiService.js returns a `{ type: 'summary', data }` result, taking `data` (matching
 * the JSON contract in services/promptTemplates.js) as input and returning the final specialist
 * string that gets written to PatientSummary.recommendedSpecialist (later rendered by
 * frontend/src/components/SpecialistBadge.jsx and baked into the PDF by services/pdfService.js).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Replaces the tiny hardcoded rule set with a comprehensive, clinically-informed rules
 *     engine: symptom-keyword -> specialist mapping table (e.g., skin/rash -> Dermatologist,
 *     joint/bone pain -> Orthopedic, pregnancy-related -> Gynecologist, child patient ->
 *     Pediatrician) that considers primarySymptom, associatedSymptoms, and severity together.
 *  2. Makes the emergency-override rules exhaustive and importable from shared/constants.js
 *     RED_FLAG_KEYWORDS, not just the two-symptom check currently here.
 *  3. Adds unit-test-friendly pure function design (no side effects, fully deterministic given
 *     the same input) and export a few named rule-check helper functions for testability.
 *  4. Keeps the exported function name `mapToSpecialist(summaryData)` and its single-argument,
 *     single-return-string contract unchanged, since chatController.js calls it synchronously
 *     inline before saving PatientSummary.
 *  5. Keeps VALID_SPECIALISTS in sync with (or import directly from) shared/constants.js
 *     SPECIALISTS array — do not let this list silently diverge from the one referenced in
 *     promptTemplates.js and the frontend.
 */
