# Kakara Dharani – Portfolio
React + Vite + Framer Motion + Lucide.
## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # outputs dist/
## Edit content
All text, links and projects live in `src/data.js`. Replace `public/resume.pdf` and `public/profile.png` to update them. Add project screenshots to `public/shots/` and set `image` in `data.js`.
## Contact form
Create a free form endpoint (e.g. Formspree), copy `.env.example` to `.env`, set `VITE_FORM_ENDPOINT`. Without it the form reports that nothing was sent.
## Resume upload
Browsers cannot save files to a static site. The upload control appears only in `npm run dev` and previews a PDF locally (PDF type, max 5 MB). To publish a new resume, replace `public/resume.pdf` and redeploy.
## Deploy
**Netlify:** push to GitHub → New site from Git → build `npm run build`, publish `dist`. Add `VITE_FORM_ENDPOINT` under Site settings → Environment variables.
**Vercel:** Import repo → framework Vite (auto) → add the same env variable → Deploy.
