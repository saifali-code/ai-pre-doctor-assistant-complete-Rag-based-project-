/**
 * FILE: frontend/src/routes/AppRoutes.jsx
 * PURPOSE: Declares every client-side route and which page component handles it.
 * CONNECTS TO: pages/LandingPage.jsx, pages/ChatPage.jsx, pages/SummaryPage.jsx,
 *   pages/HistoryPage.jsx. Rendered inside App.jsx.
 */
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import ChatPage from "../pages/ChatPage.jsx";
import SummaryPage from "../pages/SummaryPage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/summary/:id" element={<SummaryPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}

export default AppRoutes;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/routes/AppRoutes.jsx,
 * is the single routing table, rendered by App.jsx. It maps "/" -> LandingPage.jsx,
 * "/chat" -> ChatPage.jsx, "/summary/:id" -> SummaryPage.jsx (id matches a MongoDB
 * PatientSummary _id returned by the backend), "/history" -> HistoryPage.jsx.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds a protected-route wrapper for "/history" (requires login once auth exists) that
 *     redirects to "/" or a login page if unauthenticated — coordinate with whatever
 *     auth-context file is introduced for storing the JWT client-side.
 *  2. Adds a 404 "NotFound" page and catch-all route.
 *  3. Adds lazy loading (React.lazy + Suspense) for pages if bundle size becomes a concern.
 *  4. Keeps the existing four route paths ("/", "/chat", "/summary/:id", "/history") unchanged,
 *     since ChatPage.jsx navigates to `/summary/${summaryId}` directly and other components may
 *     link to these paths.
 */
