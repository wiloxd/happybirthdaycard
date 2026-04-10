# Happy Birthday Card

A simple customizable 3D text birthday wish — share a link, personalise the name, watch it spin.

---

## Setup

No build step required. Open `index.html` directly in a browser, or deploy to Netlify.

To personalise the card, append a `name` query parameter to the URL:

```
https://<your-site>.netlify.app/?name=Alice
```

If no name is provided, the page falls back to a default placeholder.

---

## File Structure

```
/
├── index.html              # Main birthday card page
├── css/
│   └── style.css           # Layout, 3D text effect, spin animation
├── js/
│   └── main.js             # URL param parsing and click-to-spin logic
├── 404.html                # Minimal 404 page
├── netlify.toml            # Netlify config: headers, redirects
├── CLAUDE.md               # Claude Code instructions
├── ROADMAP.md              # Feature roadmap
└── README.md               # This file
```

---

## Deployment

Deployed as a static site on Netlify.

- **Publish directory:** `.` (repo root)
- **Build command:** none
- Push to the deployment branch to trigger a deploy.
- Security headers and internal-file protection are configured in `netlify.toml`.
