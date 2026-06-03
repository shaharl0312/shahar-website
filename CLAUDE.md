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

Edit these files directly - no versioning needed, git tracks history.

| עמוד | קובץ לעריכה |
|------|-------------|
| דף נחיתה ראשי (/) | `landing-page-first/index.html` |
| תודה (/todah/) | `landing-page-first/todah.html` |
| ETF app (/etf-app/) | `etf-app/index.html` |
| הסכם (/agreement/) | `agreement/index.html` |
| מפגש 1 (/warriors-hub/mifgash-1/) | `warriors-hub/mifgash-1.html` |
| מפגש 2 (/warriors-hub/mifgash-2/) | `warriors-hub/mifgash-2.html` |
| מפגש 3 (/warriors-hub/mifgash-3/) | `warriors-hub/mifgash-3.html` |
| מחשבון ריבית | `my-app/ribit-derebit/index.html` |

## Build & Deploy

```sh
git add <file> && git commit -m "..." && git push   # deploys automatically
```

Vercel auto-deploys on every push to master. No need to run `vercel --prod` manually.

## Branch Workflow

Two permanent environments:

| Branch | URL | Purpose |
|--------|-----|---------|
| `master` | shaharfinance.com | Production - only merge here when ready |
| `staging` | shahar-finance-staging.vercel.app | Staging - test everything here first |

Normal workflow:
1. Claude edits files on `staging` branch, commits, pushes automatically
2. User checks shahar-finance-staging.vercel.app
3. User says "תעלה" → Claude merges staging to master → shaharfinance.com updates

## Editing Rules

- Always work on `staging` branch by default.
- Edit files directly - no versioned copies (no index_v5.html etc.)
- git history = version history. Every commit is a restore point.
- Auto-push to `staging` after every change - no approval needed.
- NEVER merge to master or push master without explicit user approval.

## Page Layout Defaults

Every new page must include the logo in the top-left corner (small, ~40-48px height), unless the user says otherwise. Example:

```html
<img src="/logo.png" alt="השקעות ללוחמים" style="height:44px;position:fixed;top:16px;left:16px;z-index:100;" />
```

Adjust position/size to fit the page design, but always top-left, always small.

## API
- [api/send-notification.js](api/send-notification.js) - Vercel serverless function for push notifications
