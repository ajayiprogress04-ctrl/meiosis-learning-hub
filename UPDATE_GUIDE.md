# Update your existing app

This version adapts simple reading tools from your latest Appendicitis Hub: quick revision, expandable sections, selected-text glossary lookup, previous-term navigation, inline diagram explanations, help and copy lesson link. Full lesson is the default. Original source material is unchanged.

1. Download and extract the project ZIP.
2. Open your existing Meiosis GitHub repository.
3. Choose **Add file → Upload files**. Open the extracted Meiosis_Learning_Hub folder and drag its contents into GitHub, keeping the same folder structure. Do not upload the enclosing folder or the ZIP.
4. Commit the changes to the branch connected to Vercel.
5. Vercel should build automatically. Open the project dashboard and wait for **Ready**, then open the production link. If automatic deployment is disabled, choose Redeploy.
6. Check a lesson, Quick revision, a term, Previous term and Back to Lesson on your phone.

Use the same Vercel project and domain to retain browser notes and progress. These are stored per browser and website address. Export a backup under My notes before updating. New features have automated coverage; visual layout and native browser interactions still need the manual checks in TESTING.md.

For a new Vercel configuration: Framework = Other; Build command = npm run build; Output directory = dist. No API keys are required.

Copy lesson link shares only the lesson route, not notes or answers. Vercel access protection, if enabled, still applies.
