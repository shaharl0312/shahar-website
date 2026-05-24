# Warriors Hub - Design Document
**Date:** 2026-05-24

## Overview
A static resource hub for financial coaching clients (career military officers). After each session, the coach sends clients a direct link to that session's resources page. No login, no personalization - fully public.

## Site Name
**תוכנית ליווי השקעות ללוחמים**

## Architecture
3 separate HTML pages (one per session) + compound interest calculator page.

```
shahar-website/warriors-hub/
  mifgash-1.html
  mifgash-2.html
  mifgash-3.html

shahar-website/my-app/ribit-derebit/
  index.html   (already exists - add to build)
```

Deployed at:
- `/warriors-hub/mifgash-1/`
- `/warriors-hub/mifgash-2/`
- `/warriors-hub/mifgash-3/`
- `/my-app/ribit-derebit/`

## Design
- Brand colors: gold `#C9A84C`, anthracite `#2D2D2D`, cream `#F7F5F0`
- RTL Hebrew
- Header with site name + 3 navigation buttons (current session highlighted in gold)
- Link cards: title + short description + CTA button
- Font: Heebo (consistent with existing tools)

## Content

### מפגש 1
1. פאנדר - השוואת קרנות כספיות - https://www.funder.co.il/kaspit
2. מחשבון ריבית דריבית - internal link to /my-app/ribit-derebit/
3. שאלון הבנה - https://forms.gle/AatFWQ1x9grVRp9e7
4. סיכום מפגש - https://drive.google.com/file/d/1dr2kuh9bIvHl7Z2DYrzI3SFJmQtATxJV/view

### מפגש 2
1. שאלון הבנה - https://forms.gle/AatFWQ1x9grVRp9e7
2. סיכום מפגש - https://drive.google.com/file/d/1n5o-9jSd861glLghaCG0MEui7uqASVGZ/view

### מפגש 3
1. מאגר תעודות סל - https://shaharfinance.com/etf-app/
2. מפת חום S&P 500 - https://il.tradingview.com/heatmap/stock/#...
3. הר הכסף - https://login.gov.il/...
4. TradingView - https://www.tradingview.com/
5. Google Finance - https://www.google.com/finance/beta/

## Build Changes
Add to `build_v2.sh`:
- Copy warriors-hub to dist/warriors-hub/
- Copy my-app/ribit-derebit to dist/my-app/ribit-derebit/

## Compound Calculator
Existing file at `my-app/ribit-derebit/index.html`. Review and verify it works correctly. Minor polish if needed - do not rewrite from scratch.
