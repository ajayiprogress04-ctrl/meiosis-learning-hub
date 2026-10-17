# Updating the learning content

## Where content lives

| File/folder | Purpose |
| --- | --- |
| `content/course.json` | Course identity, derived objectives, guided lessons, figure explanations and questions |
| `content/glossary.json` | Simple term definitions, mechanisms, memory cues, aliases and related terms |
| `content/source-slides.json` | Complete source text, figures, notes, tables and source locations for every slide |
| `assets/figures/` | The 16 original illustrations, optimised for the web |
| `assets/slides/` | Previews of all 30 complete slides |
| `sources/` | Both original PowerPoints |

Keep identifiers stable. Progress and notes refer to IDs such as `lesson-01`, not the text of a lesson heading.

## Edit a glossary entry

Each entry follows this pattern:

```json
{
  "id": "locus",
  "term": "Locus",
  "aliases": ["loci"],
  "simple": "A particular position on a chromosome or in a genome.",
  "how": "The gene is the DNA segment. Its locus tells you where it is located.",
  "memory": "Locus = location.",
  "related": ["gene", "allele", "homolog"],
  "kind": "term",
  "whyName": "Locus = location.",
  "source": "Lesson terminology with a short teaching explanation."
}
```

All aliases of at least three characters become clickable in guided lesson text. Matching prioritises longer phrases, so Meiosis II is not split into Meiosis and II. Very short notation such as `n` is explained through the Ploidy/Haploid entries rather than making every letter n clickable.

Leave `whyName` empty when a reliable naming explanation is not useful. Do not invent an etymology.

## Edit a lesson

- `body`: the readable source text. Terms link automatically.
- `sourceText`: the original extracted wording, retained for comparison. Preserve it unless the actual source changes.
- `sourceId`: points to the exact original slide, for example `class1-s03`.
- `figure`: source image path, actual pixel dimensions, alt text, meaning, parts, related term IDs and relevant cautions.
- `objectiveId`: links the lesson to its learning objective.

The full source viewer preserves cover slides and original question slides. Repeated headings are retained there even when they are consolidated in the guided view.

## Edit a question

Questions use the exact original prompt and four options. `correct` is zero-based: A = 0, B = 1, C = 2, D = 3. The answer indices were checked against the green-highlighted options in the supplied decks. The short `feedback` is explanatory teaching text.

## Replacing the PowerPoints

The extraction script is a developer utility:

```bash
python scripts/extract_sources.py /path/to/folder-with-both-pptx
```

It reads the two decks, copies originals into `sources`, extracts text/tables/notes, and optimises pictures. It requires Python with Pillow. It does not automatically invent objectives or rewrite curated lessons.

Replacing decks also requires updating `course.json`, confirming question answers, and regenerating full-slide previews. The supplied previews were rendered with LibreOffice and converted to WebP. Preserve real aspect ratios and do not crop content.

The current coverage validator deliberately expects the supplied course’s 30 slides, 16 lessons and ten questions. If you intentionally expand the course, update those expected counts and tests as part of the same change.

## Design and saved data

Theme colours and responsive layouts live in `styles.css`. The design adapts the navy, ruby, serif headings, local fonts and sidebar/glossary ideas of the supplied Appendicitis Research Hub. Research-specific features were not imported.

Browser data lives under `meiosis-learning-v1` in local storage. Its structure is defined and sanitised in `core.mjs`. Never store secrets in the app’s JSON or JavaScript.
