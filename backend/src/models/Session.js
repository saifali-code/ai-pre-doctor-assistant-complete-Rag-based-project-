/**
 * FILE: backend/src/models/Session.js
 * PURPOSE: Represents one ongoing chat conversation with a patient (guest or logged-in).
 *   Stores the full message history and conversation state so the AI has context on every turn.
 * CONNECTS TO:
 *   - controllers/chatController.js (creates/reads/updates Session on every chat message)
 *   - services/aiService.js (reads session.messages to build the LLM conversation context)
 *   - models/PatientSummary.js (a finished Session eventually produces one PatientSummary)
 * DATA FLOW: frontend sends a message -> chatController finds/creates Session by sessionId ->
 *   appends {role, content} -> passes messages array to aiService -> AI reply appended back.
 */

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
  },
  { _id: false, timestamps: true }
);

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // null = guest
    messages: { type: [messageSchema], default: [] },
    status: {
      type: String,
      enum: ["collecting", "ready_to_summarize", "summarized"],
      default: "collecting",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend (Express + Mongoose). This file,
 * backend/src/models/Session.js, defines the schema for an ongoing patient-AI chat.
 * It's read/written by controllers/chatController.js on every chat turn, and read by
 * services/aiService.js to build LLM context. When status becomes "ready_to_summarize",
 * chatController.js triggers creation of a models/PatientSummary.js document from this session.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds an index on userId and createdAt for efficient "my past sessions" queries.
 *  2. Adds a `turnCount` virtual or field to enforce the max-exchange cap described in
 *     ARCHITECTURE.md (state machine section) without recounting messages every time.
 *  3. Adds a `redFlagTriggered: Boolean` field so an emergency short-circuit (see
 *     services/aiService.js red-flag detection) is persisted and auditable.
 *  4. Keeps the messageSchema shape `{ role: 'user'|'assistant', content: string }` unchanged,
 *     since aiService.js maps this directly into the Groq/Gemini chat API message format.
 *  5. Keeps the exported model name "Session" and field names (messages, status, userId)
 *     unchanged, since chatController.js queries by these exact names.
 */
