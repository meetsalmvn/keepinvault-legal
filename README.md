# KeepinVault — Legal Documents

Static, three-page site for KeepinVault's Privacy Policy and Terms & Conditions.
Built for GitHub Pages — no build step, no dependencies beyond a browser.

## Structure

```
keepinvault-legal/
├── index.html                  landing page, links to both documents
├── privacy-policy.html         full Privacy Policy
├── terms-and-conditions.html   full Terms & Conditions
├── assets/
│   ├── style.css                shared styles (light/dark theme, layout)
│   ├── script.js                sidebar TOC, scroll-spy, dark mode, mobile nav
│   └── logo.png                 app icon used in the header
└── README.md
```

Each legal page builds its own sidebar table of contents and scroll-spy
highlighting straight from its own `<section class="legal-section">` blocks
— add, remove, or reorder a section in the HTML and the TOC follows
automatically, nothing to update by hand in `script.js`.

## Editing the legal text

Each phase of the policy lives in its own block:

```html
<section id="pp-some-id" class="legal-section">
  <h3>Section title</h3>
  <h4>Subsection title</h4>
  <p>Paragraph text…</p>
  <ul><li>List item…</li></ul>
</section>
```

Edit the text directly in `privacy-policy.html` / `terms-and-conditions.html`.
The `id` on each `<section>` is what the sidebar links jump to — change it
and update any external links pointing at that anchor.

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
# copy index.html, privacy-policy.html, terms-and-conditions.html, assets/, README.md in here
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

Link that URL (or `.../privacy-policy.html` / `.../terms-and-conditions.html`
directly) from your Play Store listing.
