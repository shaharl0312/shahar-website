# Warriors Hub Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 3-session resource hub for financial coaching clients at shaharfinance.com/warriors-hub/

**Architecture:** 3 standalone HTML files (one per session) + the existing compound calculator at /my-app/ribit-derebit/. All pages share the same brand design system. The build script copies files into dist/ with clean URL structure (/warriors-hub/mifgash-1/, etc).

**Tech Stack:** Vanilla HTML/CSS, Heebo font (Google Fonts), no JS framework, Vercel static hosting

---

## Deployed URLs (target)
- `/warriors-hub/mifgash-1/`
- `/warriors-hub/mifgash-2/`
- `/warriors-hub/mifgash-3/`
- `/my-app/ribit-derebit/` (already exists, just needs build wiring + polish)

---

## Task 1: Create mifgash-1.html

**Files:**
- Create: `shahar-website/warriors-hub/mifgash-1.html`

**Content for session 1 (4 cards):**
1. פאנדר - השוואת קרנות כספיות
   - desc: "השוו בין קרנות כספיות לפי תשואה, דמי ניהול ונזילות - בקליק אחד"
   - url: https://www.funder.co.il/kaspit
   - type: external link
2. מחשבון ריבית דריבית
   - desc: "גלו כמה הכסף שלכם יהיה שווה בעוד 20 שנה"
   - url: /my-app/ribit-derebit/
   - type: internal tool
3. שאלון הבנה - מפגש 1
   - desc: "מלאו את השאלון לסיכום החומר של המפגש"
   - url: https://forms.gle/AatFWQ1x9grVRp9e7
   - type: google form
4. סיכום מפגש 1
   - desc: "קובץ PDF עם כל הנקודות המרכזיות מהמפגש"
   - url: https://drive.google.com/file/d/1dr2kuh9bIvHl7Z2DYrzI3SFJmQtATxJV/view
   - type: download (Drive)

**Step 1: Create the HTML file**

Full HTML structure (copy exactly):

```html
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>מפגש 1 | תוכנית ליווי השקעות ללוחמים</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --gold: #C9A84C;
      --dark: #2D2D2D;
      --bg: #F7F5F0;
      --surface: #FFFFFF;
      --text: #2D2D2D;
      --text2: #6B7280;
      --border: #E0DAD2;
    }
    body { font-family: 'Heebo', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
    a { text-decoration: none; color: inherit; }

    /* Header */
    .hdr { background: var(--dark); position: sticky; top: 0; z-index: 20; }
    .hdr-in {
      max-width: 760px; margin: 0 auto;
      padding: 0 24px; height: 64px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .hdr-title { font-size: 15px; font-weight: 600; color: #fff; }
    .hdr-nav { display: flex; gap: 8px; }
    .hdr-nav a {
      font-size: 13px; font-weight: 500;
      color: rgba(255,255,255,.55);
      padding: 7px 14px; border-radius: 8px;
      transition: background .15s, color .15s;
    }
    .hdr-nav a:hover { color: #fff; background: rgba(255,255,255,.08); }
    .hdr-nav a.active { color: var(--gold); background: rgba(201,168,76,.12); }

    /* Main */
    .main { max-width: 760px; margin: 0 auto; padding: 48px 24px 80px; }
    .page-title {
      font-size: 13px; font-weight: 600;
      letter-spacing: .1em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 10px;
    }
    .page-heading {
      font-size: clamp(26px, 5vw, 36px); font-weight: 700;
      color: var(--dark); margin-bottom: 40px; line-height: 1.2;
    }

    /* Cards */
    .cards { display: flex; flex-direction: column; gap: 16px; }
    .card {
      background: var(--surface);
      border-radius: 16px;
      border: 1px solid var(--border);
      padding: 22px 24px;
      display: flex; align-items: center;
      justify-content: space-between; gap: 16px;
      transition: box-shadow .15s, border-color .15s;
    }
    .card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.07); border-color: #ccc; }
    .card-info { flex: 1; }
    .card-name { font-size: 16px; font-weight: 600; color: var(--dark); margin-bottom: 5px; }
    .card-desc { font-size: 14px; font-weight: 300; color: var(--text2); line-height: 1.55; }
    .card-btn {
      flex-shrink: 0;
      background: var(--gold); color: #fff;
      font-family: 'Heebo', sans-serif;
      font-size: 14px; font-weight: 600;
      padding: 10px 20px; border-radius: 10px;
      transition: opacity .15s, transform .15s;
      white-space: nowrap;
    }
    .card-btn:hover { opacity: .87; transform: translateY(-1px); }

    /* Mobile */
    @media (max-width: 540px) {
      .card { flex-direction: column; align-items: flex-start; }
      .card-btn { width: 100%; text-align: center; padding: 12px; }
      .hdr-title { font-size: 13px; }
      .hdr-nav a { padding: 7px 10px; font-size: 12px; }
    }
  </style>
</head>
<body>

  <header class="hdr">
    <div class="hdr-in">
      <span class="hdr-title">ליווי השקעות ללוחמים</span>
      <nav class="hdr-nav">
        <a href="/warriors-hub/mifgash-1/" class="active">מפגש 1</a>
        <a href="/warriors-hub/mifgash-2/">מפגש 2</a>
        <a href="/warriors-hub/mifgash-3/">מפגש 3</a>
      </nav>
    </div>
  </header>

  <main class="main">
    <p class="page-title">תוכנית ליווי</p>
    <h1 class="page-heading">משאבי מפגש 1</h1>

    <div class="cards">

      <div class="card">
        <div class="card-info">
          <div class="card-name">פאנדר - השוואת קרנות כספיות</div>
          <div class="card-desc">השוו בין קרנות כספיות לפי תשואה, דמי ניהול ונזילות - בקליק אחד</div>
        </div>
        <a href="https://www.funder.co.il/kaspit" target="_blank" rel="noopener" class="card-btn">כניסה</a>
      </div>

      <div class="card">
        <div class="card-info">
          <div class="card-name">מחשבון ריבית דריבית</div>
          <div class="card-desc">גלו כמה הכסף שלכם יהיה שווה בעוד 20 שנה</div>
        </div>
        <a href="/my-app/ribit-derebit/" class="card-btn">פתיחה</a>
      </div>

      <div class="card">
        <div class="card-info">
          <div class="card-name">שאלון הבנה - מפגש 1</div>
          <div class="card-desc">מלאו את השאלון לסיכום החומר של המפגש</div>
        </div>
        <a href="https://forms.gle/AatFWQ1x9grVRp9e7" target="_blank" rel="noopener" class="card-btn">מילוי</a>
      </div>

      <div class="card">
        <div class="card-info">
          <div class="card-name">סיכום מפגש 1</div>
          <div class="card-desc">קובץ PDF עם כל הנקודות המרכזיות מהמפגש</div>
        </div>
        <a href="https://drive.google.com/file/d/1dr2kuh9bIvHl7Z2DYrzI3SFJmQtATxJV/view" target="_blank" rel="noopener" class="card-btn">הורדה</a>
      </div>

    </div>
  </main>

</body>
</html>
```

**Step 2: Verify file was created**
```bash
ls "shahar-website/warriors-hub/"
```
Expected: `mifgash-1.html`

---

## Task 2: Create mifgash-2.html

**Files:**
- Create: `shahar-website/warriors-hub/mifgash-2.html`

**Content for session 2 (2 cards):**
1. שאלון הבנה - מפגש 2
   - desc: "מלאו את השאלון לסיכום החומר של המפגש"
   - url: https://forms.gle/AatFWQ1x9grVRp9e7
2. סיכום מפגש 2
   - desc: "קובץ PDF עם כל הנקודות המרכזיות מהמפגש"
   - url: https://drive.google.com/file/d/1n5o-9jSd861glLghaCG0MEui7uqASVGZ/view

**Step 1:** Copy mifgash-1.html as base, change:
- `<title>`: `מפגש 2 | תוכנית ליווי השקעות ללוחמים`
- nav: `mifgash-2` gets `class="active"`, `mifgash-1` loses it
- heading: `משאבי מפגש 2`
- Replace all 4 cards with 2 cards as above

---

## Task 3: Create mifgash-3.html

**Files:**
- Create: `shahar-website/warriors-hub/mifgash-3.html`

**Content for session 3 (5 cards):**
1. מאגר תעודות סל
   - desc: "חפשו וסננו תעודות סל ישראליות ואמריקאיות לפי פרמטרים"
   - url: https://shaharfinance.com/etf-app/
2. מפת חום S&P 500
   - desc: "ראו בזמן אמת את ביצועי מניות ה-S&P 500 לפי ענף"
   - url: https://il.tradingview.com/heatmap/stock/#%7B%22dataSource%22%3A%22SPX500%22%2C%22blockColor%22%3A%22change%22%2C%22blockSize%22%3A%22market_cap_basic%22%2C%22grouping%22%3A%22sector%22%7D
3. הר הכסף
   - desc: "בדקו את כל החסכונות הפנסיוניים וקרנות ההשתלמות שלכם"
   - url: https://login.gov.il/nidp/saml2/sso?id=usernamePasswordSMSOtp&sid=1&option=credential&sid=1
4. TradingView
   - desc: "פלטפורמת גרפים מקצועית למעקב ולניתוח שוק ההון"
   - url: https://www.tradingview.com/
5. Google Finance
   - desc: "מעקב אחרי מניות, תיקים ומדדים - ממשק פשוט וברור"
   - url: https://www.google.com/finance/beta/

**Step 1:** Copy mifgash-1.html as base, change:
- title, active nav, heading, and cards to session 3 content

---

## Task 4: Polish compound calculator

**Files:**
- Create: `shahar-website/my-app/ribit-derebit/index_v2.html` (new version, do not overwrite index.html)

**Issues to fix in v2:**
1. Header references `../logo.png` which doesn't exist at that path - replace with text logo
2. Back link `../` goes to `/my-app/` which is empty - change to `/warriors-hub/mifgash-1/`
3. Minor: ensure page works standalone (no broken assets)

**Step 1: Create index_v2.html**

In the header section, replace:
```html
<img src="../logo.png" alt="השקעות ללוחמים">
<a href="../" class="hdr-back">← חזרה</a>
```
With:
```html
<span style="font-family:'Heebo',sans-serif;font-size:15px;font-weight:700;color:var(--text)">ליווי השקעות ללוחמים</span>
<a href="/warriors-hub/mifgash-1/" class="hdr-back">חזרה למפגש 1</a>
```

**Step 2: Open in browser and verify**
- Calculator loads with default values
- "חשב" button works and shows results
- Chart renders
- Table populates
- Back link goes to correct URL

---

## Task 5: Update build_v2.sh

**Files:**
- Modify: `shahar-website/build_v2.sh`

**Step 1: Add these lines before `echo "build-ok..."`**

```sh
# Warriors hub
mkdir -p dist/warriors-hub/mifgash-1 dist/warriors-hub/mifgash-2 dist/warriors-hub/mifgash-3
cp warriors-hub/mifgash-1.html dist/warriors-hub/mifgash-1/index.html
cp warriors-hub/mifgash-2.html dist/warriors-hub/mifgash-2/index.html
cp warriors-hub/mifgash-3.html dist/warriors-hub/mifgash-3/index.html

# Compound calculator
mkdir -p dist/my-app/ribit-derebit
cp my-app/ribit-derebit/index_v2.html dist/my-app/ribit-derebit/index.html
```

**Step 2: Run build locally and verify output**
```bash
cd shahar-website && sh build_v2.sh
```
Expected: `=== BUILD COMPLETE ===` with no errors

**Step 3: Check dist output**
```bash
ls dist/warriors-hub/
ls dist/my-app/ribit-derebit/
```
Expected:
```
mifgash-1/  mifgash-2/  mifgash-3/
index.html
```

**Step 4: Verify git tracks all new files**
```bash
git -C shahar-website ls-files warriors-hub/ my-app/
```
If any file is untracked, add it:
```bash
git -C shahar-website add warriors-hub/ my-app/ribit-derebit/index_v2.html build_v2.sh
```

---

## Task 6: Commit and deploy

**Step 1: Stage and commit**
```bash
git -C shahar-website add warriors-hub/ my-app/ribit-derebit/index_v2.html build_v2.sh docs/
git -C shahar-website status
git -C shahar-website commit -m "feat: add warriors-hub session pages + compound calculator to build"
```

**Step 2: Push (triggers Vercel deploy)**
```bash
git -C shahar-website push
```

**Step 3: Wait ~60s, then verify live URLs**
- Open https://shaharfinance.com/warriors-hub/mifgash-1/
- Open https://shaharfinance.com/warriors-hub/mifgash-2/
- Open https://shaharfinance.com/warriors-hub/mifgash-3/
- Open https://shaharfinance.com/my-app/ribit-derebit/

If production doesn't update within 2 minutes:
```bash
cd shahar-website && vercel --prod --yes
```

---

## Verification Checklist

- [ ] All 3 session pages load without errors
- [ ] Nav highlights the correct active session on each page
- [ ] All links on session 1 open correctly
- [ ] Calculator back link returns to /warriors-hub/mifgash-1/
- [ ] Calculator math is correct (default values show ~249k final)
- [ ] Mobile layout looks clean at 375px width
- [ ] No broken images or 404s
