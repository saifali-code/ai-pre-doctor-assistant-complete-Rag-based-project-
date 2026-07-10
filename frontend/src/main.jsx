/**
 * FILE: frontend/src/main.jsx
 * PURPOSE: React app entry point — mounts <App /> into the DOM, wraps it in BrowserRouter.
 * CONNECTS TO:
 *   - index.html (mounts into #root)
 *   - App.jsx (the root component)
 *   - index.css (global styles, imported here so they apply app-wide)
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend (React/Vite/Tailwind, talks to an Express
 * backend for chat + PDF summary features). This file, frontend/src/main.jsx, is the React
 * entry point rendered into index.html's #root, wrapping App.jsx in react-router-dom's
 * BrowserRouter so routes/AppRoutes.jsx can define client-side navigation.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Wraps the app in a top-level ErrorBoundary component (new small file, note it under
 *     src/components/ErrorBoundary.jsx) so a crash in one page doesn't blank the whole app.
 *  2. Wraps the app in context/ChatContext.jsx's provider here at the top level (currently it
 *     may only wrap ChatPage — decide the right placement and justify) so chat state can
 *     persist across route changes if desired.
 *  3. Keeps mounting into `document.getElementById("root")` and importing `./index.css` here
 *     (not in App.jsx), since index.html only loads main.jsx as the module entry.
 */
