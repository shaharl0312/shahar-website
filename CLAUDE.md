# CLAUDE.md - shahar-website

Financial coaching website for career military officers (קצינים בקבע).
Deployed on Vercel via git push or `vercel --prod --yes`.

## Brand Colors
| Role | Hex |
|------|-----|
| Gold (primary CTA) | `#C9A84C` |
| Anthracite (text/dark bg) | `#2D2D2D` |
| Cream (page background) | `#F7F5F0` |
| Deep blue (use sparingly) | `#1B3A6B` |

## Project Structure

```
shahar-website/
├── landing-page-first/    # Main landing page → deployed at /
├── etf-app/               # ETF comparison tool → deployed at /etf-app/
├── agreement/             # Client contract signing → deployed at /agreement/
├── side-projects/
│   ├── schoolslide/       # School presentation → deployed at /schoolslide/
│   └── tzofim/            # Tzofim project → deployed at /tzofim/
├── api/                   # Vercel serverless functions
├── dist/                  # Build output (auto-generated, do not edit manually)
├── build_v2.sh            # Current build script
└── vercel.json            # Vercel config (buildCommand points to build_v2.sh)
```

## Current Production Files

| Sub-project | Production entry | Source file |
|-------------|-----------------|-------------|
| Landing page (/) | dist/index.html | landing-page-first/index_v4.html |
| ETF app (/etf-app/) | dist/etf-app/index.html | etf-app/index.html |
| Agreement (/agreement/) | dist/agreement/index.html | agreement/index_v2.html |
| Schoolslide (/schoolslide/) | dist/schoolslide/index.html | side-projects/schoolslide/index.html |
| Tzofim (/tzofim/) | dist/tzofim/index.html | side-projects/tzofim/index.html |

## Build & Deploy

```sh
sh build_v3.sh          # build locally to dist/
vercel --prod --yes     # deploy to production (if git push doesn't trigger)
```

The build uses `rsync --exclude='_archive'` so archived files never reach production.

## Deploy Rules

**NEVER push to git or run `vercel --prod` without explicit user approval.**
Always show the user what will be deployed and wait for a clear "yes" before pushing.

## Page Layout Defaults

Every new page must include the logo in the top-left corner (small, ~40-48px height), unless the user says otherwise. Example:

```html
<img src="/logo.png" alt="השקעות ללוחמים" style="height:44px;position:fixed;top:16px;left:16px;z-index:100;" />
```

Adjust position/size to fit the page design, but always top-left, always small.

## Versioning Rules

- New files get a version suffix: `index_v2.html`, `index_v3.html`, etc.
- Never overwrite an existing file - always create a new versioned copy.
- Old versions are moved to `_archive/` inside each sub-project folder, never deleted.
- Loose experiments and drafts go in `website/drafts/` (outside this repo).

## API
- [api/send-notification.js](api/send-notification.js) - Vercel serverless function for push notifications
