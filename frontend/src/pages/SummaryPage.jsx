/**
 * FILE: frontend/src/pages/SummaryPage.jsx
 * PURPOSE: The "/summary/:id" route — fetches and displays the final patient summary, offers a
 *   PDF download link.
 * CONNECTS TO:
 *   - api/client.js (getSummary, getSummaryPdfUrl)
 *   - components/SummaryCard.jsx (renders the fetched data)
 *   - react-router-dom's useParams (reads :id from the URL)
 */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSummary, getSummaryPdfUrl } from "../api/client.js";
import SummaryCard from "../components/SummaryCard.jsx";

function SummaryPage() {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getSummary(id).then(setSummary);
  }, [id]);

  if (!summary) return <p className="text-center mt-10">Loading summary...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      <SummaryCard summary={summary} />
      <a
        href={getSummaryPdfUrl(id)}
        className="block text-center bg-primary text-white py-3 rounded-lg font-medium"
      >
        Download PDF to share with your doctor
      </a>
    </div>
  );
}

export default SummaryPage;

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/src/pages/SummaryPage.jsx,
 * is the "/summary/:id" route (routes/AppRoutes.jsx), reached after hooks/useChat.js navigates
 * here. It calls api/client.js's getSummary(id) (GET /api/summary/:id from
 * backend/src/controllers/summaryController.js) and renders components/SummaryCard.jsx, plus a
 * download link built from getSummaryPdfUrl(id) (GET /api/summary/:id/pdf).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Adds proper loading/error states (network failure, 404 "summary not found") instead of an
 *     indefinite "Loading summary..." on failure.
 *  2. Adds a native Web Share API button ("Share with doctor") alongside the PDF download, for
 *     mobile users, falling back gracefully where unsupported.
 *  3. Adds a "Start a new consultation" link back to "/chat" for a natural next action.
 *  4. Keeps reading `id` via `useParams()` from the "/summary/:id" route and keeps calling
 *     `getSummary`/`getSummaryPdfUrl` from api/client.js with the same signatures.
 */
