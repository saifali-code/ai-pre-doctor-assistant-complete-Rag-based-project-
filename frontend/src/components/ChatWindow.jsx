/**
 * FILE: frontend/src/components/ChatWindow.jsx
 * PURPOSE: Renders the scrollable list of chat messages.
 * CONNECTS TO: components/MessageBubble.jsx (renders each message); used by pages/ChatPage.jsx;
 *   receives `messages` from hooks/useChat.js.
 */
import MessageBubble from "./MessageBubble.jsx";

function ChatWindow({ messages }) {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto p-4 h-[60vh]">
      {messages.map((msg, i) => (
        <MessageBubble key={i} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
}

export default ChatWindow;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/components/ChatWindow.jsx,
 * renders the message list. It receives `messages` (array of {role, content} from
 * hooks/useChat.js via pages/ChatPage.jsx) and renders each via MessageBubble.jsx.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds auto-scroll-to-bottom on new message (useRef + useEffect) so the latest message is
 *     always visible without the user scrolling manually.
 *  2. Adds an empty-state (before any messages) with a friendly prompt like "Describe what's
 *     bothering you to get started" plus the safety disclaimer visible at the top.
 *  3. Adds a typing-indicator bubble when the AI is "thinking" (consumes a loading/isAiTyping
 *     prop — coordinate with hooks/useChat.js's AI_PROMPT which proposes adding that state).
 *  4. Keeps the prop name `messages` and its shape (`{role: 'user'|'assistant', content:
 *     string}[]`) unchanged, since ChatPage.jsx passes this directly from useChat().
 */
