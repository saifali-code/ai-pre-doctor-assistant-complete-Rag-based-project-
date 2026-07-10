/**
 * FILE: frontend/src/context/ChatContext.jsx
 * PURPOSE: React Context that holds chat state (messages, sessionId, loading) so it can be
 *   shared between ChatPage.jsx and its child components without prop-drilling.
 * CONNECTS TO:
 *   - hooks/useChat.js (the logic that updates this context's state)
 *   - pages/ChatPage.jsx (wraps its subtree with ChatProvider)
 *   - components/ChatWindow.jsx, ChatInput.jsx, SymptomProgress.jsx (consume via useContext)
 */
import { createContext, useState } from "react";

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]); // [{role, content}]
  const [loading, setLoading] = useState(false);

  const value = { sessionId, setSessionId, messages, setMessages, loading, setLoading };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/context/ChatContext.jsx,
 * holds shared chat state (sessionId, messages, loading), provided by <ChatProvider> in
 * pages/ChatPage.jsx and consumed by hooks/useChat.js and chat-related components
 * (ChatWindow.jsx, ChatInput.jsx, SymptomProgress.jsx) via useContext(ChatContext).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Replaces raw useState calls with a useReducer for clearer state transitions matching the
 *     conversation state machine in ARCHITECTURE.md (collecting -> ready_to_summarize ->
 *     summarized), and exposes an `error` state for failed API calls.
 *  2. Adds a custom hook `useChatContext()` that throws a clear error if used outside
 *     <ChatProvider>, instead of components importing ChatContext directly.
 *  3. Persists sessionId to sessionStorage (not localStorage, to avoid stale cross-tab health
 *     data) so a page refresh mid-conversation doesn't lose the session id — note this requires
 *     hooks/useChat.js to read it back on mount.
 *  4. Keeps the context value's key names (sessionId, setSessionId, messages, setMessages,
 *     loading, setLoading) available in some form, since hooks/useChat.js destructures them —
 *     if switching to useReducer, provide equivalent named values/dispatchers so useChat.js
 *     doesn't need a full rewrite (or explicitly document the required useChat.js changes).
 */
