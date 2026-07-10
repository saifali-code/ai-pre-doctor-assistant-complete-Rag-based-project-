/**
 * FILE: frontend/src/components/SymptomProgress.jsx
 * PURPOSE: Small visual indicator of how far along the intake conversation is (e.g., "3/6 topics
 *   covered") to reduce user anxiety about "how many more questions?".
 * CONNECTS TO: used by pages/ChatPage.jsx; currently uses a naive message-count heuristic —
 *   a real implementation would need the backend to expose which checklist items are covered.
 */
function SymptomProgress({ messageCount }) {
  const estimatedTotal = 10; // rough heuristic — see AI_PROMPT for a real solution
  const percent = Math.min(100, Math.round((messageCount / estimatedTotal) * 100));

  return (
    <div className="px-4 pt-3">
      <div className="w-full bg-gray-200 rounded h-2">
        <div className="bg-primary h-2 rounded" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-xs text-gray-500 mt-1">Gathering information...</p>
    </div>
  );
}

export default SymptomProgress;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file,
 * frontend/src/components/SymptomProgress.jsx, gives the patient a sense of progress during the
 * chat intake, used by pages/ChatPage.jsx. Currently it fakes progress from `messageCount`
 * alone, which is inaccurate.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Reflects REAL progress by having the backend (services/promptTemplates.js's JSON contract
 *     and/or a new lightweight backend field) report which checklist categories are already
 *     covered (primary symptom, duration, severity, associated symptoms, allergies, history) —
 *     propose the minimal backend response addition needed (e.g., chatController.js returning
 *     an optional `progress: { covered: string[], total: string[] }` alongside `type: 'question'`)
 *     and consume that here instead of guessing from message count.
 *  2. Renders each checklist category as a small labeled step/checkmark instead of just a bar,
 *     using shared/constants.js-style category names for consistency.
 *  3. Keeps a graceful fallback to the current message-count heuristic if the backend hasn't
 *     been updated yet, so this component doesn't hard-break on the current API contract.
 *  4. Keeps the prop name `messageCount` supported (even if renamed/extended) so ChatPage.jsx's
 *     existing usage doesn't immediately break — document any required ChatPage.jsx prop change.
 */
