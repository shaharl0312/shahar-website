#!/usr/bin/env node
// Daily funnel health check. Fetches live production pages/APIs and writes
// health-check/data.json with the results. Run manually or via the scheduled
// cloud agent set up for this purpose.

const BASE = 'https://shaharfinance.com';
// api/health-check-internal.js only exists on the staging deployment (never merged to
// master) - it reuses the same real Rav-Messer/Cardcom credentials since those env vars
// are set on both Preview and Production in Vercel.
const STAGING_BASE = 'https://shahar-finance-staging.vercel.app';
const PIXEL_ID = '3199947373426233';

const PAGES = [
  { name: 'דף קורס (v8)', path: '/course/', requirePixel: true },
  { name: 'דף קורס ישן (v7)', path: '/course-v7/', requirePixel: true },
  { name: 'דף תודה', path: '/todah/', requirePixel: true },
  { name: 'אישור ליווי', path: '/liuy-confirmation/', requirePixel: true },
];

const APIS = [
  {
    name: 'API ליווי אישי (personal-guidance)',
    path: '/api/personal-guidance',
    body: {},
    expectStatus: [400],
  },
  {
    name: 'API ליד מדריך חינם (ravmesser-lead)',
    path: '/api/ravmesser-lead',
    body: {},
    expectStatus: [400],
  },
];

async function checkPage(page) {
  const url = BASE + page.path;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    const body = await res.text();
    const hasPixel = body.includes(PIXEL_ID) && body.includes('fbq(');
    const pass = res.status === 200 && (!page.requirePixel || hasPixel);
    return {
      name: page.name,
      url,
      pass,
      httpStatus: res.status,
      details: pass
        ? 'עולה תקין ופיקסל נמצא'
        : res.status !== 200
          ? `סטטוס לא תקין: ${res.status}`
          : 'הדף עלה אבל לא נמצא פיקסל בקוד',
    };
  } catch (err) {
    return { name: page.name, url, pass: false, httpStatus: null, details: `שגיאת רשת: ${err.message}` };
  }
}

async function checkApi(api) {
  const url = BASE + api.path;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(api.body),
    });
    const pass = api.expectStatus.includes(res.status);
    return {
      name: api.name,
      url,
      pass,
      httpStatus: res.status,
      details: pass
        ? 'ה-endpoint מגיב כצפוי'
        : `סטטוס לא צפוי: ${res.status} (ציפינו ל-${api.expectStatus.join('/')})`,
    };
  } catch (err) {
    return { name: api.name, url, pass: false, httpStatus: null, details: `שגיאת רשת: ${err.message}` };
  }
}

async function checkInternalAuth() {
  const secret = process.env.HEALTH_CHECK_SECRET;
  if (!secret) {
    return [{
      name: 'אימות אישורי רב-מסר/קארדקום',
      url: STAGING_BASE + '/api/health-check-internal',
      pass: false,
      httpStatus: null,
      details: 'HEALTH_CHECK_SECRET לא מוגדר בסביבה שמריצה את הבדיקה - דילוג על בדיקת האימות',
    }];
  }
  try {
    const res = await fetch(STAGING_BASE + '/api/health-check-internal', {
      method: 'POST',
      headers: { 'x-health-check-secret': secret },
    });
    const data = await res.json();
    if (!res.ok || !Array.isArray(data.checks)) {
      return [{
        name: 'אימות אישורי רב-מסר/קארדקום',
        url: STAGING_BASE + '/api/health-check-internal',
        pass: false,
        httpStatus: res.status,
        details: 'ה-endpoint הפנימי החזיר תשובה לא תקינה',
      }];
    }
    return data.checks.map((c) => ({ ...c, url: STAGING_BASE + '/api/health-check-internal' }));
  } catch (err) {
    return [{
      name: 'אימות אישורי רב-מסר/קארדקום',
      url: STAGING_BASE + '/api/health-check-internal',
      pass: false,
      httpStatus: null,
      details: `שגיאת רשת: ${err.message}`,
    }];
  }
}

async function main() {
  const checks = [];
  for (const page of PAGES) checks.push(await checkPage(page));
  for (const api of APIS) checks.push(await checkApi(api));
  checks.push(...(await checkInternalAuth()));

  const overallStatus = checks.every((c) => c.pass) ? 'ok' : 'issues';

  const result = {
    checkedAt: new Date().toISOString(),
    overallStatus,
    checks,
  };

  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const dir = path.join(import.meta.dirname, '..', 'health-check');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, 'data.json'), JSON.stringify(result, null, 2));

  console.log(JSON.stringify(result, null, 2));
}

main();
