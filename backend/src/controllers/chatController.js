/**
 * FILE: backend/src/controllers/chatController.js
 * PURPOSE: Handles the core chat loop — receives a patient message, gets/creates a Session,
 *   calls the AI, and either returns a follow-up question or finalizes a PatientSummary.
 * CONNECTS TO:
 *   - routes/chatRoutes.js (mounts this at POST /api/chat/message)
 *   - models/Session.js, models/PatientSummary.js
 *   - services/aiService.js, services/specialistMapper.js
 * DATA FLOW: frontend ChatInput -> POST /api/chat/message {sessionId, message} -> here ->
 *   Session updated -> aiService.getAIResponse -> either {question} back to frontend, or a new
 *   PatientSummary created and its id returned so frontend can redirect to SummaryPage.
 */

const Session = require("../models/Session");
const PatientSummary = require("../models/PatientSummary");
const { getAIResponse } = require("../services/aiService");
const { mapToSpecialist } = require("../services/specialistMapper");

async function sendMessage(req, res, next) {
  try {
    const { sessionId, message } = req.body;

    // Find existing session or start a new one (guest flow — no auth required for MVP).
    let session = sessionId
      ? await Session.findById(sessionId)
      : await Session.create({ messages: [] });

    session.messages.push({ role: "user", content: message });

    const result = await getAIResponse(session.messages);

    if (result.type === "question") {
      session.messages.push({ role: "assistant", content: result.text });
      await session.save();
      return res.json({ sessionId: session._id, type: "question", text: result.text });
    }

    // result.type === "summary" -> finalize
    session.status = "summarized";
    await session.save();

    const finalSpecialist = mapToSpecialist(result.data);
    const summary = await PatientSummary.create({
      sessionId: session._id,
      ...result.data,
      recommendedSpecialist: finalSpecialist,
    });

    return res.json({ sessionId: session._id, type: "summary", summaryId: summary._id });
  } catch (err) {
    next(err); // handled by middleware/errorHandler.js
  }
}

module.exports = { sendMessage };

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/controllers/chatController.js,
 * is the orchestration point for every chat turn. It's invoked by routes/chatRoutes.js at
 * POST /api/chat/message with body `{ sessionId, message }` sent from frontend's
 * src/api/client.js (triggered by ChatInput.jsx via useChat.js hook). It reads/writes
 * models/Session.js, calls services/aiService.js for the LLM turn, calls
 * services/specialistMapper.js as a safety net, and creates models/PatientSummary.js when done.
 * Its JSON response shape `{ sessionId, type: 'question'|'summary', text?, summaryId? }` is
 * consumed by frontend/src/hooks/useChat.js to either render a new chat bubble or navigate to
 * SummaryPage.jsx.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds input validation (message non-empty, reasonable max length, sessionId is a valid
 *     ObjectId if provided) and returns clean 400 errors instead of throwing into errorHandler.
 *  2. Enforces the max-exchange cap described in ARCHITECTURE.md — if session.messages length
 *     exceeds the cap and AI still hasn't produced a summary, force-call aiService with an
 *     instruction to summarize with whatever is known (coordinate with promptTemplates.js).
 *  3. Wraps the Session.findById + not-found case (invalid/expired sessionId) with a clear
 *     404-style JSON error instead of a generic 500.
 *  4. Optionally attaches userId from req.user (if middleware/authMiddleware.js populated it)
 *     to both Session and PatientSummary when the request is authenticated, while still
 *     supporting fully anonymous guest sessions when it isn't.
 *  5. Keeps the route contract identical: POST body `{ sessionId?, message }`, response
 *     `{ sessionId, type: 'question'|'summary', text?, summaryId? }`, since the frontend depends
 *     on this exact shape without any code changes.
 */
