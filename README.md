> Current update: version 2.0. See UPDATE_2_0.md and START_HERE.md for the latest behaviour, tests and deployment steps. Earlier notes below are historical.

> **Complete consolidated update:** Start with START_HERE.md. Audit results are in AUDIT_REPORT.md.

# Meiosis Learning Hub

A working, browser-based BIO 1107 learning companion made from the supplied Class 1 and Class 2 PowerPoints. Instructor: Mrs. Oyawale.

## What is included

- Eight objectives derived from the actual slide headings and thought questions. The decks do not contain a separate objective slide.
- All 16 teaching slides as readable lessons, with their original illustrations.
- All 30 original slides, including the covers and all ten thought questions.
- A searchable glossary of 53 concepts, clickable lesson terms and explorable diagrams.
- A Back to Lesson action that closes explanations without rebuilding the underlying lesson. Scroll position, open disclosures and focus are retained.
- Notes and question answers saved locally; older progress/bookmark data retained. Light, Dark and Colour appearances.
- Complete source decks, editable content JSON, local fonts and their licence files.

The app has no runtime dependencies, paid services, accounts or API keys. Once hosted, students only need a modern browser. Saved work stays on the current browser/device.

## 1. Run on your computer

1. Extract the ZIP. Open the `Meiosis_Learning_Hub` folder.
2. Install a supported Node.js LTS release, version 20 or newer, if you do not already have Node.js.
3. Open a terminal in the folder containing `package.json`.
4. Run:

```bash
npm run dev
```

5. Open **http://localhost:3000** in your browser. Leave the terminal open while using the app. Press Ctrl+C to stop it.

There is no dependency installation step. Do not double-click `index.html`: browsers restrict local-file content loading. Use the local server or a hosted version.

## 2. Upload to GitHub

No repository has been created or modified for this delivery.

1. Open your existing `ajayiprogress04-ctrl/meiosis-learning-hub` repository. See START_HERE.md for the one-upload update.
2. Choose **Add file → Upload files**. For a new empty repository, use its **uploading an existing file** link.
3. Open the extracted project folder. Drag its **contents**, including the `assets`, `content`, `sources`, `scripts` and `tests` folders, into the upload area. Preserve their folder structure.
4. Ensure `index.html`, `package.json` and `vercel.json` are at the repository root, not inside an extra folder.
5. Commit the uploaded files. Do not upload the ZIP itself or a generated `dist` folder.

The two PowerPoints are each below GitHub’s 25 MiB browser-upload limit. If an upload is interrupted, use GitHub Desktop or Git:

```bash
git init
git add .
git commit -m "Add meiosis learning app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/meiosis-learning-hub.git
git push -u origin main
```

Replace `YOUR-USERNAME` and the repository name with your own. Authenticate using GitHub’s normal sign-in flow, not by putting a password or token into project files.

## 3. Deploy on Vercel

No Vercel deployment has been performed for this delivery.

1. Sign in to Vercel. Choose **Add New → Project** and import the GitHub repository.
2. Select **Other** for the framework preset.
3. Leave the root directory at the folder containing `package.json`. If you uploaded an extra outer folder, select that folder as the root.
4. Keep these settings, already supplied by `vercel.json`:

| Setting | Value |
| --- | --- |
| Framework | Other |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variables | None |

5. Choose **Deploy**. After Vercel reports success, open the supplied deployment URL.
6. Verify the short checklist below on your phone and computer before sharing it with students.

Future pushes to the connected branch can trigger a new deployment. The build validates source coverage and copies only the app and its assets into `dist`.

## Quick browser check before sharing

1. Open a lesson and scroll halfway down. Open an underlined term, then a related term. Use **Back to Lesson**. Confirm the exact reading position remains.
2. Open a diagram, tap a numbered concept, use **Back to diagram**, then **Back to Lesson**.
3. Repeat using Escape and the browser Back button.
4. Open the glossary from a lesson, search for a term, then use **Back to Lesson**.
5. Answer a question and write a note. Reload and confirm the data is retained.
6. Try all three appearances and a narrow phone screen. Confirm the navigation menu, glossary dialog, source slide images and Previous/Next controls work.

Automated checks are described in `TESTING.md`. They do not replace a real browser/device check.

## Update lessons or glossary

See `CONTENT_GUIDE.md`. Edit JSON content and run:

```bash
npm test
npm run validate
npm run build
```

The `build` command generates `dist/`. The app uses hash-based navigation, so lesson links and refreshes do not require server rewrites.

## If something does not work

| Problem | What to check |
| --- | --- |
| Content could not load | Use `npm run dev`, not `file://`. Check the three JSON files in `content/`. |
| Port 3000 is occupied | Stop the other local server, or set `PORT` to another port before starting. |
| Images are missing after upload | Upload all folders without renaming their files. Run `npm run validate`. |
| Vercel reports a missing script | Confirm `scripts/build.mjs` and `scripts/validate.mjs` were uploaded. |
| Vercel displays 404 | Check the root directory, framework preset and `dist` output setting. |
| Notes disappeared on another device | Notes are local to each browser. Export/import a backup in Guide & Sources. |

## Reference documentation

- [GitHub: adding files to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Vercel: configuring a build](https://vercel.com/docs/builds/configure-a-build)
- [Vercel: vercel.json configuration](https://vercel.com/docs/project-configuration/vercel-json)
- [NHGRI: Talking Glossary of Genetic Terms](https://www.genome.gov/genetics-glossary)

The supplied PowerPoints are the lesson source of truth. Original institutional marks remain inside those source documents and their slide previews. This project does not imply institutional hosting or endorsement.

## Latest learning improvements

See UPDATE_GUIDE.md for updating the existing GitHub/Vercel app. Quick revision keeps complete lesson text one tap away. Selected-text lookup opens an exact glossary match or searches the glossary. Previous term retraces related explanations; Back to Lesson returns to the underlying lesson. Diagram explanations and help use existing educational content. Copy lesson link does not include saved notes or answers.
