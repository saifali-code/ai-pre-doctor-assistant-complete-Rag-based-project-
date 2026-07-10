/**
 * FILE: frontend/src/api/client.js
 * PURPOSE: Single Axios instance + typed helper functions for every backend call. No component
 *   should call axios/fetch directly — always go through here, so the API contract lives in
 *   one place.
 * CONNECTS TO:
 *   - hooks/useChat.js (calls sendMessage)
 *   - pages/SummaryPage.jsx (calls getSummary, getSummaryPdfUrl)
 *   - backend routes: POST /api/chat/message, GET /api/summary/:id, GET /api/summary/:id/pdf
 */
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

export async function sendMessage(sessionId, message) {
  const { data } = await api.post("/chat/message", { sessionId, message });
  return data; // { sessionId, type: 'question'|'summary', text?, summaryId? }
}

export async function getSummary(id) {
  const { data } = await api.get(`/summary/${id}`);
  return data;
}

export function getSummaryPdfUrl(id) {
  return `${API_URL}/summary/${id}/pdf`; // used directly as an <a href> for download
}

export default api;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/api/client.js, is the
 * only place that talks HTTP to the backend. hooks/useChat.js calls sendMessage() on every chat
 * turn; pages/SummaryPage.jsx calls getSummary() on load and uses getSummaryPdfUrl() for the
 * download link. It reads VITE_API_URL from the Vite env (frontend/.env), matching the
 * backend's mounted route prefixes in backend/src/app.js (/api/chat, /api/summary).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds request/response interceptors: attach an Authorization Bearer header automatically
 *     if a JWT is present (from wherever auth token storage lives once auth is built), and
 *     handle 401 responses by redirecting to login or clearing stale tokens.
 *  2. Adds consistent error handling (unwrap backend's `{ error: string }` shape into a
 *     JS Error with a clean `.message`) so calling components can just try/catch cleanly.
 *  3. Adds a request timeout and basic retry-once-on-network-failure for the chat call, since
 *     LLM calls can be slow/flaky.
 *  4. Keeps the exported function names (sendMessage, getSummary, getSummaryPdfUrl) and their
 *     parameter/return shapes unchanged, since hooks/useChat.js and SummaryPage.jsx call them
 *     with these exact signatures.
 */
