---
title: Website - status
type: project
status: active
tags: [פרויקטים, אתר]
updated: 2026-11-12
---

# מצב - אתר

## החלטות

| החלטה | סיבה | תאריך |
|---|---|---|
| מחיר הקורס עלה מ-297 ל-497 ש"ח בדף `/course/` | עדכון תמחור ע"י שחר | 2026-09-03 |
| מחיר הליווי (upsell) עלה מ-990 ל-1297 ש"ח - מתועד ב-[[core/offers]], לא מוצג באתר כי הליווי נמכר בשיחה | עדכון תמחור ע"י שחר | 2026-09-03 |
| מסגרת "מחיר השקה" הוסרה מדף `/course/` - 497 ש"ח מוצג כמחיר קבוע, בלי תג, בלי מחיר קודם מחוק | "נגמר מחיר השקה" - שחר | 2026-09-03 |

## עדכון 2026-11-04

דף ה-AI לעסקים (`funnel/ai/index.html`) הוא דף הבית של shaharfinance.com לבקשת שחר, ו-`/ai/` מפנה אליו. עלו גם `/guides/stock/` ו-`/guides/irish-etf/` עם סבב SEO (cherry-pick, בלי מיזוג staging). ב-staging עדיין מחכים שינויי מדריך חשבון המסחר (מיטב, פסגות) שטרם אושרו לפרודקשן.

## עדכון 2026-11-12

עלה מדריך ביטוח לאומי אחרי השחרור ([[projects/website/content/guides/bituach-leumi/bituach-leumi|תיעוד]]), בעיצוב נייבי חדש. עלו רק שלושת הקומיטים שלו (cherry-pick), ו-23 קומיטים ב-staging עדיין לא אושרו (טפסים עם שדה מלכודת, הגבלת בקשות, health checks ועוד), לכן אסור למזג את כל staging.

## איפה עצרנו (2026-10-15)

המדריכים באתר הותאמו למובייל עברו סבב SEO ו-GEO. הכל בפרודקשן (shaharfinance.com), אומת חי - כל הדפים והקבצים מחזירים 200. קומיטים: cc5fbd6 (עיקרי), קומיט הוספת יוטיוב, מיזוג למאסטר cfa901e.

- **מובייל:** ב-`bank-money` וב-`us-bonds` הטקסט נגע בקצוות המסך כי `.story { padding: 64px 0 40px }` דרס את `.narrow { padding: 0 24px }`. תוקן ל-padding-top/padding-bottom בלבד. הלוגו וה"כל המדריכים" הפכו מ-fixed ל-absolute. ב-`us-bonds` הוסר `</head>` כפול. שאר המדריכים (discharge, flight-claude, keren-kaspit, index) היו תקינים.
- **סכמות:** JSON-LD בכל מדריך - Article + Person (שחר) + BreadcrumbList. באינדקס - CollectionPage + ItemList. `sameAs` של Person: אינסטגרם `shahar.levy1` ויוטיוב `@shahar.levy1` בלבד (שחר: לא לינקדאין).
- **מטא:** og:image, twitter:card, og:locale ו-robots `max-image-preview:large` בכל הדפים. תמונות שיתוף 1200x630 ממותגות ב-`content/guides/og/*.jpg` (נוצרו ב-Playwright מ-HTML).
- **תוכן:** תיבת "בקצרה" (2-3 משפטים, רק ממה שכתוב במדריך) ב-bank-money, us-bonds, keren-kaspit, flight-claude. ב-bank-money גם 4 כותרות H2 בשאלות. ב-discharge אין, כי יש לו "מה תדע בסוף המדריך".
- **קבצי אתר:** `content/site-files/` (robots.txt, sitemap.xml, llms.txt) נוסף ל-`_infra/build.sh` ומועתק לשורש הדומיין. עד אז שלושתם החזירו 404.

## פתוח

- og:image של דף הנחיתה הראשי (`funnel/landing-page-first/index.html`) מצביע ל-`shahar_photo.png` שמחזיר 404. שחר: "לא עכשיו".
- שחר: להגיש `https://shaharfinance.com/sitemap.xml` ב-Google Search Console.
- מדריך חדש: להוסיף ל-`sitemap.xml` ול-`llms.txt`, ליצור תמונת og, ולהוסיף JSON-LD באותו פורמט ("מדריך חדש" ב-[[agents/mine/system/shahar-website-edit/SKILL]]).

## קשור
[[core/offers]] · [[core/me/business]] · [[projects/website/structure|structure]]
