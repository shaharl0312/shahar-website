---
title: Website
type: project
status: active
tags: [פרויקטים, אתר]
updated: 2026-11-12
---

# אתר - shaharfinance.com

אתר הליווי הפיננסי של שחר לוי. סטטי, נבנה בסקריפט shell ומתפרסם ב-Vercel.

## סקילים

| מתי                 | סקיל                                                       |
| ------------------- | ---------------------------------------------------------- |
| כל עריכה באתר       | `/shahar-website-edit` - **תמיד קודם.** עובד staging-first |
| בניית דף נחיתה חדש  | `/landing-page` ואז `/landing-page-copy`                   |
| לפני העלאה לפרודקשן | `/vercel-deploy` - צ'קליסט לפני דפלוי                      |
| עיצוב               | `[[core/design-refs/README\|core/design-refs]]` - 70 פירוקי מותגים |
| מדריך חדש           | העיצוב הנוכחי: `[[core/brand/colors#מדריכים באתר]]`, משכפלים את `content/guides/bituach-leumi/` |
| מדריך חדש באתר      | עיצוב נייבי + זהב ותמונת avatar: [[core/brand/colors#מדריכים באתר]]. דוגמה: [[projects/website/content/guides/bituach-leumi/bituach-leumi\|ביטוח לאומי]] |

## מבנה

מחולק לפי חשיבות עסקית: `funnel/` (הכנסה ולידים), `content/guides/` (מדריכים וכתבות),
`client-services/`, `tools/`, `misc/` (לא עסקי), `api/`, `_infra/build.sh`.
עץ התיקיות המלא, הנתיבים הציבוריים ודפי ה-opt-in: [[projects/website/structure]].

## דפלוי

`git add <file> && git commit -m "..." && git push`. Vercel בונה אוטומטית בכל פוש:
`vercel.json` מריץ `sh _infra/build.sh` ומגיש מ-`_infra/dist`.
דף חדש = תיקייה + `index.html` בתוכה, ואז הוספה ל-`build.sh`.

| ענף       | כתובת                             | תפקיד                         |
| --------- | --------------------------------- | ----------------------------- |
| `staging` | shahar-finance-staging.vercel.app | בודקים כאן קודם               |
| `master`  | shaharfinance.com                 | פרודקשן. ממזגים רק כששחר מאשר |

## שים לב

- **העלאת מדריך בודד לפרודקשן:** ב-staging יש קומיטים שלא אושרו, ומיזוג בתוך iCloud נתקע בטיימאאוט. עושים cherry-pick של קומיטי המדריך ל-git worktree זמני מחוץ ל-iCloud על `origin/master`, ומשם push (ר' [[agents/mine/system/shahar-website-edit/SKILL]] שלב 5).
- `_infra/dist/` נוצר אוטומטית. לעולם לא לערוך שם. אין קבצי גרסאות - הגיט הוא ההיסטוריה.
- **כל דף חדש כולל פוטר משפטי ותוסף נגישות** (חוק ישראלי): שורה אחת לפני `</body>`:
  `<script src="/legal-kit.js" defer></script>`. דף עם מעקב (Pixel, Clarity) צריך גם באנר עוגיות מלא.
- **ה-remote של גיט חושף GitHub PAT בטקסט גלוי ב-URL.** לא תוקן - לסובב את הטוקן ב-GitHub
  ולהגדיר remote מחדש בלעדיו (ר' [[core/env]]).

## קשור
[[projects/website/status|status]] · [[projects/website/structure|structure]] · [[core/brand/colors]] · [[core/design-refs/README]] · [[marketing/campaign/dashboard/README]] · [[marketing/campaign/CLAUDE]]
