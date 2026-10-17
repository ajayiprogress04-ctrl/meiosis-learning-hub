# Verification

Run npm test and npm run build from the project folder. Current result: 46 checks pass and the static build passes.

The integration suite runs the actual app module in a simulated DOM. It covers objective-to-lesson routing, grouped sidebar, dropdowns, glossary history and return position, diagram return scroll/focus, preview zoom/navigation, notes, answers, storage failures and responsive menu state. Content checks preserve source wording, question options, answer keys and asset relationships.

All 47 raster assets decode and both active font files are readable. CSS URLs resolve; stylesheet braces balance. This is not a full CSS or accessibility audit.

Manual checks after deployment:

1. Select each objective; verify direct first-lesson entry and sequential Next/Previous.
2. Use phone and desktop widths, all themes, Aa and the hamburger control. Check readability and overflow.
3. Scroll a lesson, open a term/related term and return. Open a diagram label, then Back to diagram; confirm its scroll and label focus.
4. Open an original slide. Check zoom, fit width, next/previous, download and full screen. Close it and confirm the lesson position.
5. Search the glossary, use User Guide/About and return. Save a note and answer, reload, and test backup export/import with a disposable browser profile.
6. Test the public production link and logo preview on the intended sharing platforms.

Native dialog focus, mobile layout, full screen, visual comparison and platform previews remain unverified in a rendering browser. The reference app was not modified.
