/**
 * FILE: frontend/src/pages/LandingPage.jsx
 * PURPOSE: The "/" route — intro screen explaining what the assistant does, with a CTA button
 *   that starts a new consultation.
 * CONNECTS TO: routes/AppRoutes.jsx (mounted at "/"); links to "/chat" (pages/ChatPage.jsx).
 */
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-bold mb-4">AI Pre-Doctor Assistant</h1>
      <p className="max-w-md text-gray-600 mb-6">
        Describe your symptoms before visiting the hospital. Get a structured summary and
        specialist recommendation you can share with a doctor.
      </p>
      <Link to="/chat" className="bg-primary text-white px-6 py-3 rounded-lg font-medium">
        Start Consultation
      </Link>
      <p className="text-xs text-gray-400 mt-6 max-w-sm">
        This tool does not provide medical diagnosis. In an emergency, contact local emergency
        services immediately.
      </p>
    </div>
  );
}

export default LandingPage;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/pages/LandingPage.jsx,
 * is the "/" route (routes/AppRoutes.jsx), the first screen every user sees, linking to
 * pages/ChatPage.jsx via "/chat".
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Builds real marketing-quality UI: hero section, a short "how it works" 3-step visual
 *     (Chat -> Summary -> Share with doctor), and trust signals (disclaimer, privacy note about
 *     what happens to their data).
 *  2. Adds a brief "why use this" value prop targeted at the Pakistani youth / general public
 *     audience mentioned in the project's context, in clear, accessible language.
 *  3. Adds a link to "/history" (pages/HistoryPage.jsx) for returning/logged-in users once auth
 *     exists, hidden/guarded appropriately if not logged in.
 *  4. Keeps the "Start Consultation" CTA routing to "/chat" unchanged, since that's the only
 *     entry point into the chat flow.
 */
