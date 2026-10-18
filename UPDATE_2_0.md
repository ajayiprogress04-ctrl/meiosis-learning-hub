# Meiosis Learning Hub 2.0

This is the complete cumulative project, based on repository commit 744e756f963ecd782722d08fcfe40037118a4664. Reference design and developer details were checked against Appendicitis Hub commit 81ebc624a2ae96248645c6cf7299b6ef90124b63. The reference repository was not changed.

## Changes

- Example-first lessons and glossary dialogs use One example, Demonstrated answer, Why, Remember, an independent dropdown question and short feedback after Submit. One attempt unlocks continuation; further cases remain optional.
- 85 distinct scenarios and 85 independent questions: 53 precise glossary examples plus 32 lesson cases. Each term also exposes two related lesson cases, explicitly labelled and reused. Original figures and source qualifications remain accessible.
- Compact destination dropdown and collapsed supporting navigation. Objective dropdowns, two class groups, themes, search, sharing, source previews and personal notes remain.
- Original source questions use dropdown answers in lesson references. Existing question identifiers, highlighted correct answers and source wording are unchanged.
- Saved example positions, per-objective lesson, latest responses and attempt histories extend the existing browser storage. Old backups upgrade compatibly. Retries retain historical attempts. Glossary changes refresh the underlying activity on return without discarding reading context.
- Version 20 of the supplied preferences is included. Content coverage is mapped in COVERAGE_AUDIT.md and content/coverage-audit.json.

## Validation

56 automated checks pass, including real-app interactions in a simulated DOM, feedback gating, retries, shared glossary answers, cursor restoration, legacy storage compatibility, malformed backup fields, source preservation, content links and server path handling. npm run build passes, including activity coverage validation. This is not a real-browser test result.

Real-browser, phone layout, native dialog/full-screen, production sharing previews and deployed backup file selection were not verified. The Playwright browser download failed in this environment. There was no deployment or GitHub push.

## Significant files

app.js implements the learning flow; core.mjs preserves and validates compatible storage; content/activities.json contains authored practice; reference-design.css supplies card/control styling; scripts/validate.mjs checks activity completeness. tests/activities.test.mjs and tests/app-dom.test.mjs cover new behaviour.

## Boundaries

These are hypothetical teaching exercises, not measured experimental results. Content coverage does not demonstrate mastery. The two extra cases offered by each glossary entry are related topic practice rather than two new term-specific scenarios. Dedicated examiner-defence rehearsals and interactive diagram manipulation are future extensions; no automated written-answer assessment is claimed.
