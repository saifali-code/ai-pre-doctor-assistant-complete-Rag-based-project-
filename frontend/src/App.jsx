/**
 * FILE: frontend/src/App.jsx
 * PURPOSE: Root component — renders shared layout (if any) and the route outlet.
 * CONNECTS TO: routes/AppRoutes.jsx (all page routing lives there); rendered by main.jsx.
 */
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <AppRoutes />
    </div>
  );
}

export default App;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/App.jsx, is the root
 * component rendered by main.jsx (inside BrowserRouter). It currently just renders
 * routes/AppRoutes.jsx inside a full-height background wrapper.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds a persistent top navigation/header (logo, "New Consultation" button, maybe a link to
 *     HistoryPage.jsx once auth exists) that should appear on every page.
 *  2. Adds a footer with the medical disclaimer visible app-wide (not just on SummaryPage.jsx),
 *     consistent with the safety design in ARCHITECTURE.md.
 *  3. Keeps rendering <AppRoutes /> as the main content area so route-specific pages
 *     (LandingPage, ChatPage, SummaryPage, HistoryPage) continue to work unchanged.
 */
