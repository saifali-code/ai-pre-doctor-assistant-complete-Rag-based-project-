/**
 * FILE: frontend/src/utils/formatters.js
 * PURPOSE: Small pure helper functions for formatting data in the UI (dates, lists, etc.), so
 *   components don't repeat formatting logic.
 * CONNECTS TO: currently unused by name in other files' starter code, but intended for
 *   components/pages that render PatientSummary fields (SummaryCard.jsx, HistoryPage.jsx).
 */
export function formatDuration(days) {
  if (days === null || days === undefined) return "Not provided";
  return `${days} day${days === 1 ? "" : "s"}`;
}

export function formatList(items) {
  return items && items.length > 0 ? items.join(", ") : "None";
}

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/utils/formatters.js, is
 * a shared pure-function utility module intended for use by components/SummaryCard.jsx and
 * pages/HistoryPage.jsx wherever PatientSummary fields (durationDays, associatedSymptoms, etc.
 * from backend/src/models/PatientSummary.js) need consistent display formatting.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds a `formatDate(isoString)` helper for displaying createdAt timestamps (used in a
 *     future HistoryPage.jsx list) in a locale-aware, human-friendly way.
 *  2. Adds a `formatSeverity(severity)` helper returning both label and a color-scale token
 *     name matching tailwind.config.js's proposed severity color scale, for consistent styling
 *     across SummaryCard.jsx and any future history list.
 *  3. Adds unit-test-friendly, side-effect-free functions only (no DOM access, no React) so this
 *     stays trivially testable.
 *  4. Keeps the existing exported names `formatDuration` and `formatList` and their signatures
 *     unchanged if any component already imports them, to avoid breaking call sites — refactor
 *     internals freely, not the public API surface.
 */
