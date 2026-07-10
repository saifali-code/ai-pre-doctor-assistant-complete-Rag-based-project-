/**
 * FILE: frontend/src/components/MessageBubble.jsx
 * PURPOSE: Renders a single chat message styled differently for 'user' vs 'assistant'.
 * CONNECTS TO: used only by components/ChatWindow.jsx.
 */
function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`max-w-[75%] px-4 py-2 rounded-lg ${
      isUser ? "self-end bg-primary text-white" : "self-start bg-white border"
    }`}>
      {content}
    </div>
  );
}

export default MessageBubble;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file,
 * frontend/src/components/MessageBubble.jsx, renders one message inside ChatWindow.jsx's list.
 * It receives `role` ('user'|'assistant') and `content` (string) props.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Renders markdown-lite formatting safely (line breaks, simple lists) if the AI's follow-up
 *     questions ever include them, without introducing an XSS risk (no raw dangerouslySetInnerHTML
 *     without sanitization).
 *  2. Adds a subtle timestamp and an avatar/icon distinguishing the AI assistant from the user.
 *  3. Adds accessibility attributes (role="log" region considerations live in ChatWindow.jsx,
 *     but ensure this component's markup is screen-reader friendly, e.g., proper text contrast).
 *  4. Keeps the prop names `role` and `content` unchanged since ChatWindow.jsx passes them
 *     positionally by these names.
 */
