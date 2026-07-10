/**
 * FILE: frontend/tailwind.config.js
 * PURPOSE: Tailwind CSS configuration — tells Tailwind which files to scan for class names.
 * CONNECTS TO: src/index.css imports Tailwind's base/components/utilities; every .jsx component
 *   uses Tailwind utility classes.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // calming medical blue — used across buttons/badges
      },
    },
  },
  plugins: [],
};

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" frontend. This file, frontend/tailwind.config.js,
 * configures Tailwind's content scanning and theme. It affects every component under src/.
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Establishes a small, deliberate design system: a severity color scale (Mild/Moderate/
 *     Severe -> green/amber/red) matching shared/constants.js SEVERITY_LEVELS, used consistently
 *     by SymptomProgress.jsx and SummaryCard.jsx.
 *  2. Adds specialist-badge colors per specialist type for SpecialistBadge.jsx (11 distinct,
 *     accessible colors, consistent with a calm healthcare aesthetic — avoid alarming reds
 *     except for "Emergency Care").
 *  3. Adds typography plugin or font-family extension suited for a trustworthy medical product
 *     (readable, not overly playful).
 *  4. Keeps the `primary` color key name if MessageBubble.jsx/ChatInput.jsx/etc. already
 *     reference `bg-primary`/`text-primary` classes — check usage before renaming.
 */
