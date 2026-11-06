# M-AI Primer

An unofficial, beginner-friendly primer for the University of Melbourne online **Master of Artificial Intelligence**.
Plain HTML, CSS and JavaScript: no build step, no dependencies, no network needed except for the outbound resource links.

## Open it
Double-click `index.html` (works from `file://`), or serve the folder:

    python -m http.server 8765

Progress (diagnostic answers, quiz answers, can-do ticks, theme, project canvas) is stored in your browser's
`localStorage` only.

## Layout
| Path | What it holds |
|---|---|
| `index.html` | Page shell |
| `css/style.css` | Styles (light/dark, responsive) |
| `js/content-a.js` | Modules 0–5: orientation + bridge skills (maths, Python, algorithms) |
| `js/content-b.js` | Modules 6–11: core subjects |
| `js/content-c.js` | Modules 12–16: technology stream, application stream, capstone |
| `js/diagnostic.js` | 24-question diagnostic, tagged by area and module |
| `js/glossary.js` | Glossary terms |
| `js/demos.js` | 15 interactive demos |
| `js/app.js` | Router, sidebar, progress, pages |

## Editing content
Each module is an object in `window.MODS` (`id`, `title`, `intro`, `concepts[]`, `demo`, `quiz[]`, `can[]`, `links[]`).
Add a module by appending an object; the sidebar, progress bar and resource library pick it up automatically.
Add a demo by registering `DEMOS.<id> = function (root) { ... }` in `js/demos.js` and setting `demo: { id }` on the module.

## Sources and accuracy
Subject descriptions are paraphrased from the *Master of Artificial Intelligence* course guide. Learning links go to
universities, standards bodies and established educators; all were checked as reachable when written, but third-party
availability and pricing can change. Always confirm subject details in the University's Handbook.
