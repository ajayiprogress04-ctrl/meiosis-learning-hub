# Start here — version 2.0

1. Extract the ZIP. Keep all subfolders together. Back up your learning data in the current app under My notes before replacing files.
2. For local use, install Node.js 20 or newer. Open a terminal in the folder containing package.json, run `npm run dev`, and open http://localhost:3000. Opening index.html directly will not load the JSON content. No API key or dependency installation is needed.
3. To update GitHub, open your existing meiosis-learning-hub repository. Choose Add file → Upload files and upload the extracted folder contents, keeping their subfolders. index.html, app.js, package.json and vercel.json must be at the repository root. Do not upload the ZIP as the app. Commit the upload to the branch connected to your existing Vercel project. For a large upload, use GitHub Desktop to copy the extracted files into your local repository and commit/push.
4. Keep the existing Vercel project and production address so browser-local notes remain available at the same origin. Framework: Other; Build command: npm run build; Output directory: dist. Vercel supplies its production domain during build. If it does not, set SITE_URL to the actual HTTPS production address; no domain is invented or configured by this package.
5. Wait for Ready, open the production address, and check an objective, a term, a submitted answer, Another/Next example, original slides, themes and backup export/import on desktop and phone.

UPDATE_2_0.md records the changes, actual tests and remaining verification. COVERAGE_AUDIT.md records content availability and limits. Historical handover files describe earlier versions. No GitHub push or production deployment was performed for this handover.
