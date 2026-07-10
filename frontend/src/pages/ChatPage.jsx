/**
 * FILE: frontend/src/pages/ChatPage.jsx
 * PURPOSE: The "/chat" route — hosts the live conversation between patient and AI.
 * CONNECTS TO:
 *   - context/ChatContext.jsx (wraps children in <ChatProvider>)
 *   - hooks/useChat.js (drives the chat logic)
 *   - components/ChatWindow.jsx, ChatInput.jsx, SymptomProgress.jsx
 */
import { ChatProvider } from "../context/ChatContext.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import ChatInput from "../components/ChatInput.jsx";
import SymptomProgress from "../components/SymptomProgress.jsx";
import { useChat } from "../hooks/useChat.js";

function ChatInner() {
  const { messages, loading, send } = useChat();
  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg mt-6">
      <SymptomProgress messageCount={messages.length} />
      <ChatWindow messages={messages} />
      <ChatInput onSend={send} disabled={loading} />
    </div>
  );
}

function ChatPage() {
  return (
    <ChatProvider>
      <ChatInner />
    </ChatProvider>
  );
}

export default ChatPage;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/pages/ChatPage.jsx, is
 * the "/chat" route (routes/AppRoutes.jsx), composing context/ChatContext.jsx's provider with
 * hooks/useChat.js and the chat UI components (SymptomProgress.jsx, ChatWindow.jsx,
 * ChatInput.jsx). useChat() internally calls api/client.js and navigates to
 * `/summary/:id` (pages/SummaryPage.jsx) when the backend signals the conversation is done.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds a persistent disclaimer banner at the top of the chat screen (safety requirement
 *     from ARCHITECTURE.md), and an emergency-exit affordance ("If this is an emergency, call
 *     [local number] now") always visible.
 *  2. Handles the red-flag emergency short-circuit response distinctly in the UI — since
 *     backend/src/services/aiService.js can return an immediate "Emergency Care" summary,
 *     ensure the transition to SummaryPage.jsx in that case doesn't feel like a normal chat
 *     ending (maybe a more urgent-styled transition/message).
 *  3. Adds resilience for page refresh mid-conversation (read sessionId from sessionStorage per
 *     ChatContext.jsx's AI_PROMPT proposal, and fetch existing messages via a new backend
 *     GET /api/chat/session/:id route per chatRoutes.js's AI_PROMPT proposal).
 *  4. Keeps composing ChatProvider + useChat() + SymptomProgress/ChatWindow/ChatInput in this
 *     same responsibility split (context for state, hook for logic, this file for layout) rather
 *     than collapsing everything into one giant component.
 */
