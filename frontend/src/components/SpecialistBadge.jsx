/**
 * FILE: frontend/src/components/SpecialistBadge.jsx
 * PURPOSE: Small colored badge/pill displaying the recommended specialist.
 * CONNECTS TO: used by components/SummaryCard.jsx; conceptually mirrors shared/constants.js
 *   SPECIALISTS list for valid values.
 */
function SpecialistBadge({ specialist }) {
  const isEmergency = specialist === "Emergency Care";
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
        isEmergency ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
      }`}
    >
      {isEmergency ? "🚨 " : "🩺 "}
      {specialist}
    </span>
  );
}

export default SpecialistBadge;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file,
 * frontend/src/components/SpecialistBadge.jsx, renders the final specialist recommendation,
 * used inside SummaryCard.jsx, receiving a `specialist` string prop that should always be one
 * of shared/constants.js's SPECIALISTS values (enforced server-side by
 * backend/src/services/specialistMapper.js).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Maps EVERY specialist in shared/constants.js SPECIALISTS to a distinct, accessible color
 *     (not just a binary emergency/non-emergency split as today), matching the color scale
 *     proposed in tailwind.config.js's AI_PROMPT.
 *  2. Adds an icon per specialist type (simple emoji or a small icon set) for quick visual
 *     scanning.
 *  3. Adds an `Emergency Care` variant that's visually urgent (pulsing/bold) without being
 *     alarming to the point of causing panic — balance tone carefully for a health product.
 *  4. Keeps the prop name `specialist` (a single string) unchanged, since SummaryCard.jsx
 *     passes `summary.recommendedSpecialist` directly.
 */
