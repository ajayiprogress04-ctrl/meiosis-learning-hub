# Update the existing app

Follow START_HERE.md. This package contains all requested updates and the final audit fixes; earlier ZIPs are not required.

Upload the extracted project contents to your existing meiosis-learning-hub GitHub repository. Commit to the branch connected to Vercel and wait for Ready. Framework: Other. Build: npm run build. Output: dist.

Keep using the same production domain and browser to retain local notes and answers. Export a backup under My notes before clearing browser data or changing devices.

For sharing, use the public production domain. Set SITE_URL in Vercel to that exact HTTPS address only if Vercel does not supply VERCEL_PROJECT_PRODUCTION_URL. Redeploy after changing it. Platform previews remain subject to the platform's own rules and caching.

See AUDIT_REPORT.md and TESTING.md for verified checks and remaining browser tests.

Latest simplification: removed the lesson toolbar containing Quick revision, Expand sections, Collapse sections, Look up selected text, Help and Copy lesson link. Use the left-panel glossary and User Guide, the landing Quick guide, clickable terms and normal navigation. The complete course remains available.

Developer profile now uses the portrait and qualifications checked against the live Appendicitis Hub profile. Longer details remain expandable. Normal navigation, including Next and Previous, opens the destination at the top; explicit Back to Lesson and glossary/diagram returns still preserve the saved reading position. Latest: 48 automated checks and build pass; browser visual checks remain pending.

Share app is now beside Quick guide on the landing page. It uses native device sharing where supported, then clipboard copy or a visible copyable link. It shares the production app URL without lesson state, notes or answers. 49 automated checks and build pass; actual OS sharing and social-platform previews remain unverified.

Landing actions now include Quick guide, Share app and a separate Copy link button. Copy link copies the app address directly. The latest My_App_Design_Preferences.md is included and records the instruction to update it after each complaint or correction. 50 automated checks and build pass.
