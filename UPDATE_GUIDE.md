# Update your existing app

This version applies the actual reference fonts, palette, compact panels, objective navigation and three appearance themes from your Appendicitis Hub. See DESIGN_ADAPTATION.md for the source mapping and verification limits. It also adapts simple reading tools from your latest Appendicitis Hub: quick revision, expandable sections, selected-text glossary lookup, previous-term navigation, inline diagram explanations, help and copy lesson link. Full lesson is the default. Original source material is unchanged.

1. Download and extract the project ZIP.
2. Open your existing Meiosis GitHub repository.
3. Choose **Add file → Upload files**. Open the extracted Meiosis_Learning_Hub folder and drag its contents into GitHub, keeping the same folder structure. Do not upload the enclosing folder or the ZIP.
4. Commit the changes to the branch connected to Vercel.
5. Vercel should build automatically. Open the project dashboard and wait for **Ready**, then open the production link. If automatic deployment is disabled, choose Redeploy.
6. Check a lesson, Quick revision, a term, Previous term and Back to Lesson on your phone.

Use the same Vercel project and domain to retain browser notes and progress. These are stored per browser and website address. Export a backup under My notes before updating. New features have automated coverage; visual layout and native browser interactions still need the manual checks in TESTING.md.

For a new Vercel configuration: Framework = Other; Build command = npm run build; Output directory = dist. No API keys are required.

Copy lesson link shares only the lesson route, not notes or answers. Vercel access protection, if enabled, still applies.

The ☰ button now collapses or expands the desktop sidebar and remembers your choice. On phones it opens the navigation drawer. All three themes have deeper, more saturated colours.

Landing page: choose an objective from the dropdown to open its learning section. The full card grid has been removed. Latest verification: 37 automated checks and deployment build pass; browser visual checks remain pending.

Sidebar: Class 1 and Class 2 are expandable groups. Objectives appear only inside their class; the current class opens automatically. Latest: 38 automated checks and build pass.

User Guide and About the Developer now have their own sidebar and footer links. The developer identity and contact links were checked against the live reference profile. All three themes use stronger text, border and control contrast. Latest: 39 automated checks and deployment build pass; real-browser visual checks remain pending.

## Logo and professional sharing address

Your supplied PNG is the app logo, favicon and social preview image. Open Graph and Twitter metadata are included. Platforms decide whether to show an image and may cache old previews. The original logo is retained without alteration.

In Vercel, open this Meiosis project → Settings → Domains. Use its production domain rather than a long preview deployment address. You may add an available clean Vercel domain or a custom domain you own; a proposed name is not guaranteed available.

The build uses VERCEL_PROJECT_PRODUCTION_URL when available. Otherwise set SITE_URL in Vercel Environment Variables to the exact HTTPS production address, then redeploy. This produces absolute image URLs, canonical URL and og:url. Copy lesson link uses that production address. Sharing previews require publicly accessible hosting. No domain was registered or renamed by this update.

Short-first display: User Guide and Course & sources now show collapsed topic headings. Developer details and objective-organisation notes also open on demand. Educational content remains available in full.

Glossary display follows the reference Hub: plain meaning and learning relevance first. Mechanism, naming explanation where available, memory aid and related terms open separately. Glossary browsing shows term names without every definition at once; alphabet browsing is collapsible. Back to Lesson retains the underlying lesson and reading position. Latest: 40 automated checks and build pass.
