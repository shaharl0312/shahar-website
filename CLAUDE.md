---
title: Website
type: project
status: active
tags: [פרויקטים, אתר]
updated: 2026-09-12
---

# אתר - shaharfinance.com

אתר הליווי הפיננסי לקצינים בקבע. סטטי, נבנה בסקריפט shell ומתפרסם ב-Vercel.

## סקילים

| מתי                 | סקיל                                                       |
| ------------------- | ---------------------------------------------------------- |
| כל עריכה באתר       | `/shahar-website-edit` - **תמיד קודם.** עובד staging-first |
| בניית דף נחיתה חדש  | `/landing-page` ואז `/landing-page-copy`                   |
| לפני העלאה לפרודקשן | `/vercel-deploy` - צ'קליסט לפני דפלוי                      |
| עיצוב               | `[[core/design-refs/README\|core/design-refs]]` - 70 פירוקי מותגים |

## מבנה

מחולק לפי חשיבות עסקית - לא רק לפי סוג עמוד. תיקיית המקור שונה, ה-URL הציבורי (הנתיבים
למטה) לא השתנה בכלל.

```
website/
├── funnel/                        המשפך הקריטי - הכנסה/לידים
│   ├── landing-page-first/        → /            דף נחיתה ראשי + todah.html
│   ├── funnel-hadracha/           → /guide/, /guide-hayalim/, /bank-money/
│   ├── course-landing/            → /course/, /course-v9/
│   ├── erosion-calculator/        → /erosion-calculator/
│   ├── agreement/                 → /agreement/
│   └── agreement-one-meeting/     → /agreement-one-meeting/
├── client-services/
│   └── warriors-hub/              → /warriors-hub/mifgash-1..3   ליווי ללקוחות קיימים
├── tools/
│   ├── etf-app/                   → /etf-app/          כלי השוואת ETF
│   └── my-app/ribit-derebit/      → /my-app/ribit-derebit/  מחשבון ריבית דריבית
├── misc/
│   └── side-projects/             → /schoolslide/, /tzofim/, /trip-madeira/  לא עסקי
├── api/                            פונקציות Vercel (submit-lead)
└── _infra/build.sh                סקריפט הבנייה. הפלט ל-_infra/dist (לא לערוך ידנית)
```

## דפלוי

```sh
git add <file> && git commit -m "..." && git push
```

Vercel בונה אוטומטית בכל פוש. `vercel.json` מריץ `sh _infra/build.sh` ומגיש מ-`_infra/dist`.
דף חדש = תיקייה + `index.html` בתוכה, ואז הוספה ל-`build.sh`.

| ענף       | כתובת                             | תפקיד                         |
| --------- | --------------------------------- | ----------------------------- |
| `staging` | shahar-finance-staging.vercel.app | בודקים כאן קודם               |
| `master`  | shaharfinance.com                 | פרודקשן. ממזגים רק כששחר מאשר |

## שים לב

- `_infra/dist/` נוצר אוטומטית. לעולם לא לערוך שם.
- אין קבצי גרסאות. הקובץ החי הוא תמיד `index.html`. הגיט הוא ההיסטוריה.
- `funnel/funnel-hadracha/optin-v2.html` הוא דף ה-opt-in החי (`/guide/`, קהל רחב). `funnel/funnel-hadracha/optin-hayalim.html` (`/guide-hayalim/`) הוא וריאנט ייעודי לקמפיין חיילים משוחררים - קופי נפרד, אותה תשתית טכנית. `optin.html` ו-`video.html`/`video-v2.html` נמחקו (2026-08-19, אושר על ידי שחר - לא בשימוש).

## קשור
[[projects/website/status|status]] · [[core/brand/colors]] · [[core/design-refs/README]] · [[projects/dashboard/CLAUDE]] · [[projects/campaign/CLAUDE]]
