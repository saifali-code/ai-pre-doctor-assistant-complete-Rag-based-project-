/**
 * FILE: shared/constants.js
 * PURPOSE:
 *   Single source of truth for enums/lists that BOTH frontend and backend conceptually rely on:
 *   specialist types, severity levels, symptom categories, red-flag keywords.
 *   Note: since frontend and backend are separate npm projects (not a real shared package here),
 *   copy this file's values into backend/src/services/specialistMapper.js and any frontend
 *   component that needs the same list (e.g., SpecialistBadge.jsx), OR turn this into a real
 *   shared npm workspace package later (see AI_PROMPT below for that upgrade path).
 *
 * CONNECTS TO:
 *   - backend/src/services/specialistMapper.js (specialist rules)
 *   - backend/src/services/promptTemplates.js (tells the LLM which specialist labels are valid)
 *   - frontend/src/components/SpecialistBadge.jsx (rendering labels/colors)
 *   - frontend/src/components/SymptomProgress.jsx (checklist categories)
 */

// The closed set of specialist labels the whole system is allowed to output.
// Keeping this closed (not free text from the LLM) is a safety + UX decision.
const SPECIALISTS = [
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
  "Emergency Care", // used when red-flag symptoms are detected
];

const SEVERITY_LEVELS = ["Mild", "Moderate", "Severe"];

// Server-side red-flag detector (backend/src/services/aiService.js) scans user text for these.
const RED_FLAG_KEYWORDS = [
  "chest pain",
  "can't breathe",
  "difficulty breathing",
  "severe bleeding",
  "suicidal",
  "loss of consciousness",
  "stroke",
  "face drooping",
];

module.exports = { SPECIALISTS, SEVERITY_LEVELS, RED_FLAG_KEYWORDS };

/**
 * AI_PROMPT (copy this block to an AI to generate a production version of THIS file only):
 * ---------------------------------------------------------------------------------------
 * You are working on "AI Pre-Doctor Assistant", a full-stack triage chatbot app
 * (React + Vite frontend, Node/Express + MongoDB backend, Groq/Gemini LLM for conversation).
 * This file, shared/constants.js, is the canonical list of specialist types, severity levels,
 * and red-flag keywords used across the system for safety and consistent UX.
 *
 * Context of use:
 *  - backend/src/services/specialistMapper.js imports SPECIALISTS + rules to deterministically
 *    map a structured symptom object to one specialist label, as a safety net over LLM output.
 *  - backend/src/services/promptTemplates.js embeds SPECIALISTS and RED_FLAG_KEYWORDS into the
 *    LLM system prompt so it only ever proposes valid specialist labels and knows what counts
 *    as an emergency.
 *  - backend/src/services/aiService.js scans incoming user messages against RED_FLAG_KEYWORDS
 *    BEFORE calling the LLM, to short-circuit into an emergency response.
 *  - frontend/src/components/SpecialistBadge.jsx and SymptomProgress.jsx use these lists for
 *    rendering (badge colors per specialist, checklist categories per symptom).
 *
 * Task: Produce a production-ready version of this constants file that:
 *  1. Expands RED_FLAG_KEYWORDS into a much more clinically sound, categorized list (cardiac,
 *     respiratory, neurological, mental-health-crisis, obstetric emergencies, pediatric
 *     emergencies) with regex-safe matching helpers (handle typos/variants, e.g., "cant breathe",
 *     "can not breathe").
 *  2. Adds a SEVERITY_WEIGHTS or scoring rubric usable by specialistMapper.js for consistent
 *     severity classification.
 *  3. Restructures this into a real shared package (e.g., npm workspaces monorepo, or a small
 *     published-locally package) so frontend and backend import the exact same file instead of
 *     copy-pasting, and explains the minimal package.json / workspace changes needed elsewhere.
 *  4. Adds JSDoc types for every exported constant.
 *  5. Does NOT change the two required named exports (SPECIALISTS array of strings, and the
 *     existing consumer imports in specialistMapper.js/promptTemplates.js) without also providing
 *     a migration note, since other files depend on these exact names.
 *  6. Keep the module.exports (CommonJS) style consistent with the rest of the backend, unless
 *     you also convert the whole backend to ESM (call this out explicitly, don't do it silently).
 */
