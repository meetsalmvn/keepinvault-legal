# KeepinVault — Legal Documents

Static, three-page site for KeepinVault's Privacy Policy, Terms & Conditions,
and EULA. Built for GitHub Pages — no build step, no dependencies beyond a
browser.

## Structure

```
keepinvault-legal/
├── index.html                  Privacy Policy — this is the site's landing page
├── terms-and-conditions.html   full Terms & Conditions
├── eula.html                   full End User License Agreement
├── assets/
│   ├── style.css                shared styles (light/dark theme, layout)
│   ├── script.js                sidebar TOC, scroll-spy, dark mode, mobile nav
│   └── logo.png                 app icon used in the header
└── README.md
```

There is no separate home/landing page — `index.html` **is** the Privacy
Policy, so visiting the site root goes straight to it. The header's top nav
has exactly three links (Privacy Policy → `index.html`, Terms & Conditions,
EULA) and is centered in the header on every screen size, with the logo
pinned left and the dark-mode toggle pinned right — that's a 3-column CSS
grid (`grid-template-columns: 1fr auto 1fr`) on `.app-header`, not
flexbox `space-between`, so the nav stays visually centered regardless of
how wide the logo or the toggle button are.

`eula.html` is flat — one heading per section (e.g. "1.1 Purpose", "2.1 App"),
with no "Phase N" grouping labels. The source document's numbering (1.1, 1.2,
2.1…) is kept in the heading text itself, but there's no separate phase-level
heading above it, unlike the Privacy Policy and Terms pages, which do have a
top-level heading per phase alongside their numbered subsections.

Each page builds its own sidebar table of contents and scroll-spy
highlighting straight from its own `<section class="legal-section">` blocks
— add, remove, or reorder a section in the HTML and both the sidebar and the
mobile "Jump to section" dropdown follow automatically, nothing to update by
hand in `script.js`.

## Editing the legal text

Each section lives in its own block:

```html
<section id="pp-some-id" class="legal-section">
  <h3>Section title</h3>
  <h4>Subsection title</h4>
  <p>Paragraph text…</p>
  <ul><li>List item…</li></ul>
</section>
```

Edit the text directly in `index.html` / `terms-and-conditions.html` /
`eula.html`. The `id` on each `<section>` is what the sidebar links and the
`#anchor` jump to — change it and update any external links pointing at that
anchor.

The **Effective Date** / **Last Updated** fields currently read
`[To be added upon release]`, straight from the source documents — fill
those in before publishing.

## Running locally

No server needed — just open `index.html` in a browser. For a local server
(recommended, since some browsers restrict `file://` fetches):

```bash
cd keepinvault-legal
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploying to GitHub Pages

```bash
cd ~/projects
git clone https://github.com/meetsalmvn/keepinvault-legal.git
cd keepinvault-legal
# copy index.html, terms-and-conditions.html, eula.html, assets/, README.md in here
git add .
git commit -m "Add legal pages"
git push
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy
from a branch → Branch: main, folder: / (root) → Save**.

The site will be live at:

```
https://meetsalmvn.github.io/keepinvault-legal/
```

That root URL loads the Privacy Policy directly. Link
`.../terms-and-conditions.html` or `.../eula.html` for the other two
documents from your Play Store listing.
