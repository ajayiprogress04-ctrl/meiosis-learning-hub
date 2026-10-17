# Reference design adaptation

Reference repository: https://github.com/ajayiprogress04-ctrl/appendicitis-learning-hub
Inspected commit: 81ebc624a2ae96248645c6cf7299b6ef90124b63 (Upgrade 5). Live HTML, CSS and interaction source were also inspected on 17 October 2026.

## Applied source patterns

| Reference source | Applied in Meiosis |
| --- | --- |
| styles.css brand tokens | Exact ruby, bronze, navy, green and paper values in reference-design.css |
| Shared typography block | Source Sans 3 and Cormorant Garamond, local fonts and original font licences |
| research-overview, objective-card, objective-head | Compact overview, bordered panels, coloured objective edges and objective banner |
| objective-nav and desktop-sidebar | Eight direct objective links, current-objective state and lesson navigation |
| Dark and colored theme tokens | Black dark mode and burgundy colour mode with original action gradients |
| scientific-backgrounds.css | Fixed low-opacity composition; imagery adapted to decorative cells and chromosomes |
| Glossary and disclosure controls | Concise meaning/how/name/memory fields, contextual return and related-term backtracking retained |

Clinical objectives, variables, statistical calculations and reporting workflows were not transferred. The original reference repository was read only. No content JSON, source PowerPoints or teaching images were changed by this redesign. Inferred objectives are explicitly labelled in the objective view.

## Verification and limits

Automated app integration uses a simulated DOM, not a rendering browser. Tests cover objectives, source wording, glossary links, retained lesson DOM and scroll position, diagrams, quick revision, notes, answers, themes and mobile-menu handlers. Build validation checks source coverage and local assets. CSS asset references and font files are checked separately. Visual consistency was compared through source rules and tokens; rendered side-by-side comparison, phone layout, native dialog focus and real clipboard still need browser testing. No live GitHub or Vercel deployment was performed.

## Deeper colour revision

Owner-requested deeper burgundy, navy, bronze and green accents; stronger tinted objective panels; near-black burgundy Colour mode; deeper header and action gradients. Layout, content and interaction code are unchanged. Build and asset validation passed; rendered colour comparison remains unverified.

All three themes now use saturated burgundy, blue, bronze and green objective panels, stronger headers and active navigation. Calculated secondary-text contrast on the brightest coloured panel endpoints exceeds 4.5:1. This is a numeric check, not a complete browser accessibility audit.
