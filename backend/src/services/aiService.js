/**
 * FILE: backend/src/services/aiService.js
 * PURPOSE: All communication with the LLM provider (Groq primary, Gemini fallback) lives here.
 *   Also runs the server-side red-flag keyword safety check BEFORE calling the LLM.
 * CONNECTS TO:
 *   - services/promptTemplates.js (SYSTEM_PROMPT sent as first message)
 *   - controllers/chatController.js (calls getAIResponse() with session message history)
 *   - config/env.js (API keys)
 * DATA FLOW: chatController.js -> aiService.getAIResponse(messages) -> Groq API ->
 *   returns either { type: "question", text } or { type: "summary", data } to chatController.js.
 */

const axios = require("axios");
const { GROQ_API_KEY, GROQ_MODEL } = require("../config/env");
const { SYSTEM_PROMPT } = require("./promptTemplates");

// Minimal placeholder list — full clinical list should live in shared/constants.js (see there).
const RED_FLAG_KEYWORDS = ["chest pain", "can't breathe", "severe bleeding", "suicidal"];

function detectRedFlag(userText) {
  const lower = userText.toLowerCase();
  return RED_FLAG_KEYWORDS.some((kw) => lower.includes(kw));
}

async function getAIResponse(messages) {
  // messages: [{role: 'user'|'assistant', content: string}, ...] from Session.messages

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  if (lastUserMessage && detectRedFlag(lastUserMessage.content)) {
    // Safety short-circuit: skip the LLM entirely for known emergency phrasing.
    return {
      type: "summary",
      data: {
        primarySymptom: lastUserMessage.content,
        durationDays: null,
        associatedSymptoms: [],
        allergies: "Not provided",
        medicalHistory: "Not provided",
        severity: "Severe",
        recommendedSpecialist: "Emergency Care",
      },
    };
  }

  // Call Groq's OpenAI-compatible chat completions endpoint.
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: GROQ_MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    },
    { headers: { Authorization: `Bearer ${GROQ_API_KEY}` } }
  );

  const rawText = response.data.choices[0].message.content.trim();

  // Very naive check: does the reply look like JSON (i.e., time to summarize)?
  if (rawText.startsWith("{")) {
    try {
      return { type: "summary", data: JSON.parse(rawText) };
    } catch {
      // fall through to treat as plain text if parsing fails
    }
  }

  return { type: "question", text: rawText };
}

module.exports = { getAIResponse, detectRedFlag };

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/services/aiService.js,
 * is the ONLY place that talks to the LLM provider. It's called by controllers/chatController.js
 * with the full Session.messages array (models/Session.js). It imports SYSTEM_PROMPT from
 * services/promptTemplates.js. Its output shape `{ type: 'question', text }` or
 * `{ type: 'summary', data }` is consumed by chatController.js: 'question' gets appended to the
 * session and returned to the frontend chat; 'summary' triggers creation of a
 * models/PatientSummary.js via services/specialistMapper.js as a safety cross-check.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Replaces the naive RED_FLAG_KEYWORDS array with the full list from shared/constants.js
 *     (import/replicate RED_FLAG_KEYWORDS from there) and use word-boundary-safe matching.
 *  2. Adds a Gemini fallback call (using GEMINI_API_KEY from config/env.js) if the Groq call
 *     fails or times out, with a short timeout + retry, so one flaky provider doesn't break the
 *     chat experience.
 *  3. Replaces the fragile `rawText.startsWith('{')` check with structured output: use the
 *     provider's JSON mode / function-calling if available, or a more robust parser that
 *     tolerates markdown code fences around the JSON.
 *  4. Validates the parsed summary JSON against the exact schema from promptTemplates.js /
 *     models/PatientSummary.js before returning it, and falls back to asking one more
 *     clarifying question if validation fails, instead of silently returning malformed data.
 *  5. Adds basic per-session rate limiting / cost guardrails (e.g., max tokens, max turns)
 *     consistent with the "max exchange cap" described in ARCHITECTURE.md.
 *  6. Keeps the exported function names `getAIResponse(messages)` and `detectRedFlag(text)` and
 *     the return shape `{ type: 'question'|'summary', text?, data? }` unchanged, since
 *     chatController.js pattern-matches on `result.type` exactly.
 */
