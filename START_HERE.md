# Upload all updates at once

This is the complete Meiosis app. Extract the ZIP and open Meiosis_Learning_Hub.

1. Open https://github.com/ajayiprogress04-ctrl/meiosis-learning-hub — use this repository, not Appendicitis.
2. Choose Add file → Upload files. Drag the extracted folder's contents into GitHub, preserving subfolders. index.html, package.json and vercel.json belong at the repository root. Do not upload the ZIP or an enclosing folder.
3. Commit to the branch connected to your existing Vercel project.
4. In Vercel, wait for the deployment to show Ready. Use Framework: Other, Build command: npm run build, Output directory: dist.
5. Open the production URL and check a lesson, glossary return and document preview on your phone.

The package contains every requested update. No external repository or live deployment was changed by this delivery.

For a clean sharing address, use Vercel Settings → Domains. The build uses the production domain supplied by Vercel. If it is unavailable, set SITE_URL to the exact HTTPS production address and redeploy. Domain names are subject to availability; none has been registered or renamed for you.

Run locally: install Node.js 20 or newer, open a terminal in the project folder, run npm run dev, then visit http://localhost:3000. No dependency installation or API key is needed.

See AUDIT_REPORT.md for changes, verification and limits.
