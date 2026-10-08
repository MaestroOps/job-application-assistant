# Job Application Assistant

A personal React app for analysing a CV against a job description.

## Current features

- Paste a CV and a job description
- Request AI-assisted analysis of matching evidence, weak or missing requirements, and practical recommendations
- Receive structured results from a small server-side API
- Responsive interface with loading and error states

## Run in StackBlitz or locally

Requirements: Node.js and npm.

```bash
npm install
```

Create a local `.env` file based on `.env.example` and add your own API key:

```env
OPENAI_API_KEY=your_real_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Then start both the Vite client and API server:

```bash
npm run dev
```

Open the Vite URL printed in the terminal. The API runs on port 3001 and Vite proxies `/api` requests to it.

**Keep your real API key in `.env` only. Never paste it into React code or commit it to GitHub.** If a key is accidentally exposed, revoke it and create another.

## Data and privacy

- The app does not save CVs or job descriptions to a database.
- Text is sent to the server only when you press **Analyse with AI**.
- The server forwards the supplied text to the configured AI provider to produce the analysis.
- This project does not intentionally log CV or job-description text.
- The AI provider may process or retain submitted content under its own terms and settings. Do not use real personal information until you have reviewed the provider's current data controls.

This is a personal-use project, not a production-hardened public service. The API has basic request-size limits but does not yet implement authentication or rate limiting.

## Current limitations

The match score is an AI-generated estimate, not a validated metric or a prediction of hiring success. Review all findings and recommendations. Never add qualifications, skills, achievements, or metrics that you cannot substantiate.

## Roadmap

1. Build and test AI-assisted analysis. **In progress**
2. Add CV upload and text extraction.
3. Generate tailored CV bullet points and concise cover letters.
4. Add an application tracker with optional browser-local persistence.
5. Evaluate whether a database or authentication is needed for personal use.
6. Test edge cases and deploy securely if needed.
