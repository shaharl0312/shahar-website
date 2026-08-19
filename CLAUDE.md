---
title: Website
---

# אתר - shaharfinance.com

אתר הליווי הפיננסי לקצינים בקבע. סטטי, נבנה בסקריפט shell ומתפרסם ב-Vercel.

## סקילים

| מתי                 | סקיל                                                       |
| ------------------- | ---------------------------------------------------------- |
| כל עריכה באתר       | `/shahar-website-edit` - **תמיד קודם.** עובד staging-first |
| בניית דף נחיתה חדש  | `/landing-page` ואז `/landing-page-copy`                   |
| לפני העלאה לפרודקשן | `/vercel-deploy` - צ'קליסט לפני דפלוי                      |
| עיצוב               | `[[core/design-refs]]` - 70 פירוקי מותגים                  |

## מבנה

```
website/
├── landing-page-first/   → /            דף נחיתה ראשי + todah.html
├── etf-app/              → /etf-app/    כלי השוואת ETF
├── agreement/            → /agreement/  חתימת הסכם לקוח
├── funnel-hadracha/      → /guide/      משפך ההדרכה החינמית (optin)
├── warriors-hub/         → /warriors-hub/mifgash-1..3
├── erosion-calculator/   מחשבון שחיקת כסף
├── my-app/ribit-derebit/ מחשבון ריבית דריבית
├── course-landing/       וריאנטים של דף הקורס
├── side-projects/        schoolslide, tzofim
├── api/                  פונקציות Vercel (submit-lead)
└── _infra/build.sh       סקריפט הבנייה. הפלט ל-_infra/dist (לא לערוך ידנית)
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
- ב-`funnel-hadracha` יש `optin.html` + `optin-v2.html` - **לא ברור מי החי**, לשאול את שחר לפני שנוגעים. `video.html`/`video-v2.html` נמחקו (2026-08-19, לא בשימוש).

## קשור
[[core/brand/colors]] · [[core/design-refs/README]] · [[projects/dashboard/CLAUDE]] · [[projects/campaign/CLAUDE]]
