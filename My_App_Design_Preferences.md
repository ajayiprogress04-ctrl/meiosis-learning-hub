# My App Design Preferences

Version 3 · Confirmed from the Meiosis app development conversation · 17 October 2026

## How to use this brief

Read this before designing or modifying one of my apps. Treat it as my default preference, while following any newer project-specific instruction. Inspect the existing target project and the latest accessible reference source. Implement the work and deliver the complete project; do not stop at recommendations. Ask only for essential missing information. Work systematically and continue through the agreed steps without asking me to say “next” after each one.

Short request for a future app:

> Use My App Design Preferences. Inspect my existing project and the latest Appendicitis Hub source, preserve the features I need, and build a visually simple app in that design family. Show short content first, keep details expandable, and deliver all changes in one complete ZIP.

This brief is portable. It does not guarantee that every unrelated future chat automatically receives it. Attach or select it in a new chat, or include it among the project reference files/instructions.

## 1. The design standard

Reference app: https://appendicitis-learning-hub.vercel.app/
Reference repository: https://github.com/ajayiprogress04-ctrl/appendicitis-learning-hub

Use the reference as a design and interaction standard. Inspect actual HTML, CSS, JavaScript, assets, configuration and recent commits when accessible. Do not assume the deployed site contains every repository update. Never modify the reference when working on a different target app.

Reuse its real design patterns where practical: Source Sans 3 interface typography, Cormorant Garamond headings, ruby/burgundy actions, navy, bronze and green accents, subtle scientific linework, compact panels, restrained gradients and familiar navigation. Adapt imagery and content to the new subject. Do not import clinical variables, statistical workflows or unrelated research functions into an educational app.

Prefer recognisable continuity over a generic template. Avoid oversized headings, excessive white space, thick decorative borders, busy dashboards and rows of competing buttons.

## 2. Colours and readability

I prefer much deeper, richer colours with strong contrast in ALL three themes: Light, Dark and Colour. Improving only the Colour theme is insufficient.

- Light: very dark, clear text against readable lighter surfaces, with deep burgundy, navy, bronze and green accents.
- Dark: near-black backgrounds with bright, readable text and visible control boundaries.
- Colour: deep burgundy/plum and other rich panels, with bright text that remains easy to read.
- Use colour deliberately; do not make text faint, washed out or low contrast.
- Keep secondary text, inputs, links, selected states and focus indicators readable too. Check contrast rather than simply darkening everything.
- Decorative backgrounds must stay subtle and must not interfere with text or scientific figures.

## 3. Show less at once

My default is visually simple, compact and uncluttered. Do not display long paragraphs, every objective, every explanation or every tool at once.

Show short summaries, then reveal extra information through clear expandable sections, dropdowns or focused views. Preserve all important educational content behind those controls; do not omit it just to shorten the screen.

For the Meiosis app, I specifically removed:

- The landing Continue your learning panel, completion progress bar and Continue learning button; Quick guide remains.
- The wide All objectives / Objective 1–8 button row; use a dropdown.
- The intermediate objective lesson-card listing; selecting an objective opens its first lesson directly.
- The right-hand lesson panel containing Your Progress, Mark complete, Bookmark lesson and In This Objective.
- The repeated Original slide wording & source disclosure on each lesson; original documents remain available in Original Slides.
- The six-button lesson toolbar: Quick revision, Expand sections, Collapse sections, Look up selected text, Help and Copy lesson link.

These are established simplification choices for Meiosis. For another app, do not automatically introduce similar clutter. Retain a control only when it serves the new app's actual task or I request it. Do not re-add removed controls merely because they once existed.

## 4. Navigation and learning sequence

- Use the familiar ☰ three-line button to collapse and expand the desktop left panel; remember the choice. On phones, use it to open the navigation drawer.
- Categorise objectives under expandable class/module headings, rather than one long flat list. Meiosis uses Class 1 and Class 2.
- Use a compact objective dropdown on the landing page and inside lessons. Group options by class and identify the current objective.
- Choosing an objective opens its first relevant lesson immediately.
- Show multiple lessons one after another, one lesson at a time, with Previous/Next and an indicator such as Lesson 1 of 2.
- Clicking Next or Previous opens the destination at the TOP, even if previously visited.
- Returning from a glossary explanation or diagram is different: restore the precise lesson/visual, scroll position, focus and reading context.
- Make the destination and return actions obvious. Avoid redundant navigation panels.
- Every question-review or practice sequence needs a clear End review action at the bottom. It returns to the overview at the top without resetting answers or saved work.

## 5. My glossary and explanation rules

Golden rule: Explain the WHY in seconds.

Use direct, simple, clear, concise and memorable language. Avoid textbook paragraphs, unnecessary introductions, vague definitions and repetitive wording.

Show first:

1. Plain meaning: what the term is.
2. Why it matters in the actual lesson or task.

Make additional details available separately:

- Why this name? Give the naming logic or origin only when known and supported.
- Why does it work this way? Explain the mechanism simply.
- Remember it this way: a short memory aid.
- A brief example only when useful and accurate.
- Related terms and relevant source/lesson links.

Make important terms, abbreviations and appropriate diagram labels clickable. Keep search convenient. Do not display every full definition while browsing term names. Explain uncertain or unavailable information honestly; do not manufacture definitions, etymologies or image interpretations.

Provide both previous-term navigation and an explicit return to the originating lesson/diagram. Back must restore the previous position, not reopen a different page at the top. Preserve the underlying reading content where possible.

## 6. Diagrams and document previews

Pictures should be visually simple and educationally accurate. Preserve supplied scientific figures and original meaning.

Numbered diagram markers must correspond to the correct features and stay aligned when resized. Never reuse arbitrary fixed marker positions across unrelated diagrams. If a location has not been established, use a labelled numbered key below the image instead of implying a verified spatial annotation.

After opening a label explanation, Back to diagram restores the same visual, scroll position and focused label. Back to Lesson then restores the lesson.

PowerPoint and Word previews should follow the focused document-viewing approach in the reference Hub: a large readable document, minimal surrounding text, clear page/slide navigation, zoom, fit width, download and full screen where supported. Extra extracted text and thumbnails should not dominate the screen.

A PowerPoint image preview is not proof of a Word renderer. Implement and test the document types actually needed; do not claim unsupported types work.

## 7. Guide, developer identity and sharing

- Keep Quick guide easy to find on the landing page.
- Keep three explicit actions together on the landing page: Quick guide, Share app and Copy link. Copy link must be visible, not hidden only as a Share fallback. It copies the clean production app address without opening the native sharing menu. Prefer native sharing for Share app, with clipboard and visible-link fallbacks.
- Provide a clearly labelled User Guide and About the Developer, without dumping lengthy text on screen.
- Use my actual approved developer biography, qualifications and portrait from the current reference or supplied profile. Do not replace it with a generic “creates useful tools” description or infer identity from unrelated account history.
- The reference currently identifies Progress Ajayi. Recheck the current published profile before copying changing qualifications or status.
- Use the supplied app logo in appropriate branding and social-sharing metadata.
- Share a clean, professional public production address, rather than a long preview/deployment address. Never invent domain availability or claim a domain was configured when it was not.
- Sharing previews are controlled partly by each platform; do not guarantee universal logo display without testing.

## 8. Engineering, source accuracy and delivery

Inspect and improve the actual existing project. Keep the target app separate from reference projects. Preserve valid recent changes and useful working functionality.

For PowerPoint learning apps, inspect the supplied source documents first. Preserve important text, figures, tables, questions and source references. Organise by actual learning objectives; clearly label objectives inferred from headings or content.

Use maintainable content files, local assets where practical and minimal dependencies. Avoid paid services and API keys for the core experience unless agreed. Support mobile and desktop, usable controls, keyboard focus, readable text and helpful error states. Preserve existing user data through compatible updates.

Test relevant workflows and build the actual project. Separate automated logic/simulated-DOM checks from real-browser, responsive, full-screen and sharing verification. Never claim to have tested, committed, pushed or deployed something without evidence.

Deliver ONE complete project ZIP containing all updates so far, not a patch that depends on earlier downloads. Include brief beginner-friendly instructions for running locally, uploading the extracted contents to the intended GitHub repository and deploying to Vercel. Provide concise change notes, significant files, test results and remaining issues. Do not make me repeat prior preferences or assemble multiple versions.

Keep messages concise. Explain the result and the next essential action. Ask focused questions only when genuinely needed.

## Updating this brief

For every complaint, correction or preference I express about my apps, update this brief as part of that task without waiting for me to ask again. Record the reusable rule, amend the relevant section, and resolve the older conflicting rule. Do not treat an app-specific request as a universal rule unless that is clearly intended. Keep general defaults separate from decisions specific to one app. Preserve this document as the reusable source of truth, and include the latest copy with future project handovers.

### Revision notes

- Version 3, 17 October 2026: added an End review action after practice questions, returning to the overview without clearing answers.

- Version 2, 17 October 2026: added an explicit Copy link beside Quick guide and Share app; made updating this brief after every complaint/correction an ongoing instruction.
- Naming decision: retain Meiosis Learning Hub; the proposed broader rename was declined.
