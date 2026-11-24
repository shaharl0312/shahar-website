---
title: Website - מבנה
type: project
status: active
tags: [פרויקטים, אתר]
updated: 2026-10-25
---

# מבנה האתר

מחולק לפי חשיבות עסקית - לא רק לפי סוג עמוד. תיקיית המקור שונה, ה-URL הציבורי (הנתיבים
למטה) לא השתנה בכלל.

```
website/
├── funnel/                        המשפך הקריטי - הכנסה/לידים
│   ├── landing-page-first/        → /            דף נחיתה ראשי + todah.html + legal-kit.js
│   ├── funnel-hadracha/           → /guide/, /guide-hayalim/
│   └── course-landing/            → /course/, /course-v9/
├── content/guides/                → /guides/, /guides/<slug>/   מדריכים וכתבות (SEO)
├── client-services/
│   ├── warriors-hub/              → /warriors-hub/mifgash-1..3   ליווי ללקוחות קיימים
│   ├── quote/                     → /quote/      הצעת מחיר כללית לליווי השקעות
│   ├── proposals/<שם>/            → /proposals/<שם>/   הצעת עבודה ללקוח (noindex, עולה לבד דרך build.sh)
│   ├── agreement/                 → /agreement/
│   └── agreement-one-meeting/     → /agreement-one-meeting/
├── tools/
│   ├── etf-app/                   → /etf-app/          כלי השוואת ETF
│   ├── my-app/ribit-derebit/      → /my-app/ribit-derebit/  מחשבון ריבית דריבית
│   └── erosion-calculator/        → /erosion-calculator/
├── misc/
│   └── side-projects/             → /schoolslide/, /tzofim/, /trip-madeira/  לא עסקי
├── api/                            פונקציות Vercel (submit-lead)
└── _infra/build.sh                סקריפט הבנייה. הפלט ל-_infra/dist (לא לערוך ידנית)
```

מדריך שנשלח לאנשים (מגנט לידים, מובטח בריל) הוא דף כאן ולא PDF. דוגמאות: `/guides/keren-kaspit/`,
`/guides/discharge/` ([[projects/website/content/guides/discharge/discharge|תיעוד]]),
`/guides/bituach-leumi/` ([[projects/website/content/guides/bituach-leumi/bituach-leumi|תיעוד]]). שורה ב-`_infra/build.sh`
מעתיקה את `index.html` ואת `screenshots/` בלבד, כך שקבצי MD בתיקייה לא עולים לאתר.

שכבת SEO ו-GEO של המדריכים (2026-10-15): JSON-LD בכל מדריך, תמונות שיתוף ב-`content/guides/og/`,
וקבצי שורש הדומיין `robots.txt`, `sitemap.xml`, `llms.txt` ב-`content/site-files/` (מועתקים דרך `_infra/build.sh`).
פירוט ופתוחים: [[projects/website/status|status]].

`/bank-money/` הישן מפנה (redirect קבוע ב-`vercel.json`) ל-`/guides/bank-money/` - המדריך עבר
לקטגוריית המדריכים, ה-URL החדש הוא הקנוני.

## דפי ה-opt-in

- `funnel/funnel-hadracha/optin-v2.html` - הדף החי (`/guide/`, קהל רחב).
- `funnel/funnel-hadracha/optin-hayalim.html` (`/guide-hayalim/`) - וריאנט לקמפיין חיילים משוחררים,
  קופי נפרד ואותה תשתית טכנית.
- `optin.html`, `video.html`, `video-v2.html` נמחקו ב-2026-08-19 (אושר על ידי שחר, לא בשימוש).

## קשור
[[projects/website/CLAUDE]] · [[projects/website/status|status]]
