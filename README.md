# Job Application Assistant

A small React app for comparing a CV with a job description.

## Current features

- Paste a CV and a job description
- Count words in both text areas
- Extract frequent keywords from the job description
- Show which extracted keywords appear in the CV and which may be missing
- Responsive layout for desktop and mobile

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Important limitation

The current score is a basic keyword-overlap heuristic. It is not an AI assessment, does not understand synonyms or context, and cannot predict hiring outcomes. The app currently processes text in the browser and does not send it to a server.

## Roadmap

1. Improve keyword extraction and avoid misleading matches.
2. Add CV upload and text extraction.
3. Add an AI-assisted analysis endpoint.
4. Add tailored suggestions and an application tracker.
