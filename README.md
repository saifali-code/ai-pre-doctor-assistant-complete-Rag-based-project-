# 🏆 AI Pre-Doctor Assistant Complete Project 

An AI-powered conversational triage assistant. A patient describes symptoms in a chat interface,
the AI asks intelligent follow-up questions, builds a structured medical summary, recommends the
right type of specialist, and lets the patient download/share a PDF report before visiting a hospital.

This is NOT a diagnostic tool. It is a triage/pre-consultation assistant. Every AI-generated summary
must carry a disclaimer that it does not replace professional medical advice.

## Tech Stack (100% free-tier to start)

| Layer | Choice | Why | Free tier |
|---|---|---|---|
| Frontend | React (Vite) + Tailwind CSS | Fast dev, component reuse, matches your existing stack | Vercel/Netlify free hosting |
| Backend | Node.js + Express | Same language as frontend, huge ecosystem | Render/Railway free web service |
| Database | MongoDB Atlas | Flexible schema for chat/session data, generous free tier | Atlas M0 free cluster (512MB) |
| AI/LLM | Groq API (Llama 3.1/3.3) primary, Google Gemini API as fallback | Groq is free + extremely fast for chat; Gemini free tier as backup | Both have free tiers |
| PDF generation | pdf-lib (Node) | Lightweight, no headless browser needed | Free, self-hosted |
| Auth (optional MVP+) | JWT + bcrypt | Simple, no vendor lock-in | Free |
| Hosting | Vercel (frontend) + Render (backend) | Zero-cost CI/CD deploy from GitHub | Free |

## Monorepo Structure

```
ai-pre-doctor-assistant/
├── frontend/     → React chat UI, patient summary view, PDF download trigger
├── backend/      → Express API, AI orchestration, PDF generation, DB models
├── shared/       → Constants shared conceptually between frontend/backend (specialist list, symptom taxonomy)
├── ARCHITECTURE.md
└── README.md (this file)
```

## How data flows (high level):

1. Patient opens ChatPage (frontend) → sends first message.
2. Frontend `api/client.js` POSTs to backend `/api/chat/message`.
3. `chatController.js` loads/creates a `Session` (Mongo), appends message, calls `aiService.js`.
4. `aiService.js` sends conversation + `promptTemplates.js` system prompt to Groq/Gemini,
   gets back either a follow-up question OR a structured JSON summary (when AI decides enough
   info is collected).
5. If structured summary → `specialistMapper.js` maps symptoms/severity → recommended specialist.
6. Summary saved as `PatientSummary` in Mongo, returned to frontend → `SummaryPage.jsx` renders it.
7. Patient clicks "Download PDF" → frontend calls `/api/summary/:id/pdf` → `pdfService.js`
   generates PDF with pdf-lib → streamed back to browser for download/share.

## Getting started (see full step-by-step in ARCHITECTURE.md):

```bash
# Backend
cd backend && npm install && cp .env.example .env  # fill in MONGO_URI + GROQ_API_KEY
npm run dev

# Frontend
cd frontend && npm install && cp .env.example .env  # fill in VITE_API_URL
npm run dev
```

## Important:
This scaffold intentionally contains ONLY minimal starter code in every file so the project
runs end-to-end but is not production-grade yet. Every file has:
- A header comment explaining its purpose and connections.
- Inline comments explaining each section.
- A dedicated `AI_PROMPT:` comment block at the bottom — copy that block into any AI (Claude, etc.)
  to generate a production-ready version of *that specific file only*, with full context of how it
  fits the rest of the system.

## Future enhancements (see ARCHITECTURE.md § Roadmap):
Voice input, multilingual support (Urdu/Roman Urdu), doctor-side dashboard, symptom-checker
knowledge base grounding (RAG over verified medical sources), triage urgency alerts (red-flag
symptoms → "go to ER now"), WhatsApp bot channel, analytics for hospitals/clinics (B2B angle).
