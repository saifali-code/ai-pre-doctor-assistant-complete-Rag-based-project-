# Architecture & Roadmap — AI Pre-Doctor Assistant

## 1. System Architecture

```
┌─────────────────┐        HTTPS/JSON        ┌──────────────────────┐
│   React Frontend │ ───────────────────────▶ │   Express Backend    │
│  (Vite, Tailwind)│ ◀─────────────────────── │   (Node.js)           │
└─────────────────┘                           └──────────┬───────────┘
                                                          │
                              ┌───────────────────────────┼───────────────────────────┐
                              ▼                           ▼                           ▼
                     ┌────────────────┐         ┌──────────────────┐        ┌──────────────────┐
                     │  MongoDB Atlas │         │  Groq / Gemini    │        │   pdf-lib         │
                     │  (Session,     │         │  LLM API          │        │   (in-process PDF │
                     │  PatientSummary│         │  (chat + JSON     │        │   generation)      │
                     │  User)         │         │  extraction)      │        │                    │
                     └────────────────┘         └──────────────────┘        └──────────────────┘
```

## 2. Core domain concepts

- **Session**: one continuous conversation with a patient (guest or logged in). Holds message history + state (collecting / ready_for_summary / summarized).
- **PatientSummary**: the structured output — symptoms, duration, severity, allergies, history, recommended specialist. This is what gets turned into a PDF.
- **Specialist Mapping**: rule-based (deterministic) layer that takes structured symptom data and maps to a specialist type. AI proposes, but a deterministic `specialistMapper.js` double-checks/overrides for safety-critical categories (e.g., chest pain + shortness of breath → always flag "Emergency/Cardiologist" regardless of what the LLM says).

## 3. Conversation flow (state machine)

```
[start] → collecting_symptoms → asking_follow_up (loop) → collecting_history → ready_to_summarize → summarized
```
The AI decides when it has "enough" information based on a checklist embedded in the system prompt
(primary symptom, duration, severity, associated symptoms, allergies, existing conditions, medications).
Backend enforces a hard cap (e.g., max 12 exchanges) so the AI can't loop forever — after the cap,
it is forced to summarize with whatever it has and mark missing fields as "not provided".

## 4. Safety design (non-negotiable for a health-adjacent product)

- Always show disclaimer: "This is not a medical diagnosis. For emergencies call [local emergency number]."
- Red-flag keyword detector runs on every user message server-side (chest pain, difficulty breathing,
  severe bleeding, suicidal ideation, stroke symptoms) — if triggered, bypass the normal flow and
  immediately return an "URGENT: seek emergency care now" response instead of continuing to chat.
- Never let the LLM's free-text output be trusted blindly for the specialist recommendation — always
  pass through the deterministic `specialistMapper.js` as a safety net.

## 5. Step-by-step build guide (free, start to finish)

### Phase 0 — Accounts (all free)
1. MongoDB Atlas → create free M0 cluster → get connection string.
2. Groq Console (console.groq.com) → free API key (Llama 3.3 70B or similar).
3. (Optional fallback) Google AI Studio → free Gemini API key.
4. GitHub repo for the project (for CI/CD deploy).
5. Vercel account (frontend hosting) + Render or Railway account (backend hosting).

### Phase 1 — Backend first
1. `cd backend && npm install`.
2. Fill `.env` (Mongo URI, Groq key, PORT, JWT_SECRET, CLIENT_URL).
3. Implement `db.js` connection, verify with `npm run dev` + hit a health route.
4. Build `promptTemplates.js` system prompt (the "brain" of the assistant) — this is the highest
   leverage file, iterate heavily here.
5. Build `aiService.js` to call Groq's chat completion endpoint.
6. Wire `chatController.js` + `chatRoutes.js` → test with curl/Postman.
7. Build `specialistMapper.js` deterministic rules.
8. Build `pdfService.js` + `summaryController.js` + `summaryRoutes.js`.
9. Add `errorHandler.js`, `logger.js` for basic reliability.

### Phase 2 — Frontend
1. `cd frontend && npm install`.
2. Build `ChatPage.jsx` + `ChatWindow.jsx` + `MessageBubble.jsx` + `ChatInput.jsx` first — get a
   working chat loop against the backend.
3. Build `SymptomProgress.jsx` (visual "3/6 questions answered" style progress).
4. Build `SummaryPage.jsx` + `SummaryCard.jsx` + `SpecialistBadge.jsx` — render final summary + PDF
   download button.
5. Wire routing in `AppRoutes.jsx`.

### Phase 3 — Connect + polish
1. Set `VITE_API_URL` in frontend `.env` to backend URL (local first, then deployed URL).
2. Test full flow locally end-to-end.
3. Add auth (optional for MVP — guest sessions are fine to launch with).

### Phase 4 — Deploy (free)
1. Push to GitHub.
2. Backend → Render/Railway: connect repo, set env vars, deploy.
3. Frontend → Vercel: connect repo, set `VITE_API_URL` to the Render backend URL, deploy.
4. MongoDB Atlas → whitelist Render's IP (or 0.0.0.0/0 for MVP simplicity).

## 6. Roadmap / Future enhancements (startup lens)

- **v1 (MVP)**: guest chat sessions, AI summary, deterministic specialist mapping, PDF export.
- **v2**: user accounts + summary history, multilingual (Roman Urdu/Urdu) prompts for Pakistani
  users, WhatsApp channel via Twilio/Meta Cloud API free tier.
- **v3**: RAG grounding over vetted medical sources (WHO, Mayo Clinic public data) to reduce
  hallucination risk in follow-up questions.
- **v4 (B2B)**: clinic/hospital dashboard — patients pre-fill triage before arriving, receptionist
  sees a queue with urgency flags. This is the monetizable wedge (SaaS for clinics).
- **Scalability**: move session state to Redis if chat volume grows; consider streaming LLM
  responses (SSE) for better perceived latency; add rate limiting per IP/session; add
  observability (Sentry free tier, simple request logging).
