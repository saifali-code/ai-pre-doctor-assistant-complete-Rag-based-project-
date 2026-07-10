/**
 * FILE: frontend/src/components/ChatInput.jsx
 * PURPOSE: Text input + send button for composing a chat message.
 * CONNECTS TO: hooks/useChat.js (calls `send(text)` on submit); used by pages/ChatPage.jsx.
 */
import { useState } from "react";

function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        className="flex-1 border rounded px-3 py-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe your symptoms..."
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/components/ChatInput.jsx,
 * is the message composer, used by pages/ChatPage.jsx, calling the `onSend(text)` prop (wired
 * to hooks/useChat.js's `send` function) on submit, and disabled while `disabled` (loading) is
 * true.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds Enter-to-send / Shift+Enter-for-newline behavior with a <textarea> instead of <input>
 *     for longer symptom descriptions, auto-growing height.
 *  2. Adds client-side validation (max length, non-empty after trim already present) with a
 *     visible character counter for very long inputs.
 *  3. Adds a subtle loading spinner inside the send button when `disabled` is true due to an
 *     in-flight request (vs. disabled for other reasons) — coordinate prop naming with
 *     ChatPage.jsx/useChat.js.
 *  4. Keeps the prop names `onSend` and `disabled` unchanged, since ChatPage.jsx wires
 *     `onSend={send}` and `disabled={loading}` from useChat().
 */
