/**
 * FILE: backend/src/services/pdfService.js
 * PURPOSE: Generates a downloadable/shareable PDF from a PatientSummary document using pdf-lib.
 * CONNECTS TO:
 *   - controllers/summaryController.js (calls generateSummaryPDF() and streams the bytes to the client)
 *   - models/PatientSummary.js (source of the fields laid out in the PDF)
 * DATA FLOW: GET /api/summary/:id/pdf -> summaryController fetches PatientSummary from Mongo ->
 *   pdfService.generateSummaryPDF(summary) -> returns PDF bytes -> controller sets headers and sends.
 */

const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

async function generateSummaryPDF(summary) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size in points
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 800;
  const line = (text, size = 12) => {
    page.drawText(text, { x: 50, y, size, font, color: rgb(0, 0, 0) });
    y -= size + 10;
  };

  line("Patient Summary", 20);
  line(`Primary Symptom: ${summary.primarySymptom}`);
  line(`Duration: ${summary.durationDays ?? "Not provided"} day(s)`);
  line(`Associated Symptoms: ${summary.associatedSymptoms.join(", ") || "None"}`);
  line(`Allergies: ${summary.allergies}`);
  line(`Medical History: ${summary.medicalHistory}`);
  line(`Severity: ${summary.severity}`);
  line(`Recommended Specialist: ${summary.recommendedSpecialist}`, 14);
  y -= 10;
  line(summary.disclaimer, 9);

  return pdfDoc.save(); // returns Uint8Array of PDF bytes
}

module.exports = { generateSummaryPDF };

/**
 * AI_PROMPT:
 * ---------------------------------------------------------------------------------------
 * Project: "AI Pre-Doctor Assistant" backend. This file, backend/src/services/pdfService.js,
 * turns a models/PatientSummary.js document into PDF bytes using pdf-lib. It is called only
 * from controllers/summaryController.js's PDF-download route handler, which fetches the
 * PatientSummary by id, calls generateSummaryPDF(summary), then sends the returned bytes with
 * `Content-Type: application/pdf` headers to the frontend (SummaryPage.jsx's download button).
 *
 * Task: Generate a production-ready version of ONLY this file that:
 *  1. Produces a genuinely professional layout: clinic-style header/logo placeholder, patient
 *     name (if logged in) and date, a bordered table-like layout for the symptom fields instead
 *     of plain stacked lines, and a footer with the disclaimer in smaller/italic text and page
 *     numbers.
 *  2. Handles text wrapping for long fields (medicalHistory, associatedSymptoms) instead of
 *     letting text run off the page width.
 *  3. Adds a QR code or short reference ID on the PDF (using the PatientSummary._id) so a doctor
 *     can look up the digital record if needed — note any new dependency required (e.g., a
 *     qrcode npm package) and how it'd be added to backend/package.json.
 *  4. Keeps the exported function signature `generateSummaryPDF(summary)` returning a Promise
 *     that resolves to PDF bytes (Uint8Array/Buffer), since summaryController.js awaits it and
 *     pipes the result directly into the HTTP response.
 *  5. Keeps reading the exact same PatientSummary field names (primarySymptom, durationDays,
 *     associatedSymptoms, allergies, medicalHistory, severity, recommendedSpecialist,
 *     disclaimer) without requiring schema changes elsewhere.
 */
