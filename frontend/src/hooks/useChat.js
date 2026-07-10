/**
 * FILE: frontend/src/hooks/useChat.js
 * PURPOSE: Encapsulates the chat interaction logic — sending a message, updating context state,
 *   and handling navigation to the summary page once the AI finishes.
 * CONNECTS TO:
 *   - context/ChatContext.jsx (reads/writes sessionId, messages, loading)
 *   - api/client.js (sendMessage call to backend)
 *   - components/ChatInput.jsx (calls the `send` function this hook returns)
 *   - react-router-dom's useNavigate (redirect to /summary/:id when done)
 */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../context/ChatContext.jsx";
import { sendMessage } from "../api/client.js";

export function useChat() {
  const { sessionId, setSessionId, messages, setMessages, loading, setLoading } =
    useContext(ChatContext);
  const navigate = useNavigate();

  async function send(text) {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const result = await sendMessage(sessionId, text);
      setSessionId(result.sessionId);

      if (result.type === "question") {
        setMessages((prev) => [...prev, { role: "assistant", content: result.text }]);
      } else {
        navigate(`/summary/${result.summaryId}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, send };
}

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/hooks/useChat.js, is
 * the logic layer between the UI (ChatInput.jsx calling `send(text)`, ChatWindow.jsx rendering
 * `messages`) and context/ChatContext.jsx (state) + api/client.js (sendMessage HTTP call). On
 * receiving a `{ type: 'summary', summaryId }` response it navigates to
 * `/summary/${summaryId}` which routes/AppRoutes.jsx maps to pages/SummaryPage.jsx.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds error handling: catch failed sendMessage calls, surface a user-friendly error state
 *     (e.g., "Something went wrong, please try again") without losing the user's typed message.
 *  2. Adds an optimistic-UI "typing indicator" state (e.g., `isAiTyping`) consumed by
 *     ChatWindow.jsx / MessageBubble.jsx while awaiting the backend response.
 *  3. Guards against double-submits (disable send while loading is true — verify ChatInput.jsx
 *     also disables its button based on this hook's `loading`).
 *  4. Keeps the exported hook name `useChat` and its returned shape `{ messages, loading, send }`
 *     unchanged, since ChatPage.jsx/ChatInput.jsx/ChatWindow.jsx call `useChat()` expecting
 *     exactly these three values.
 */
