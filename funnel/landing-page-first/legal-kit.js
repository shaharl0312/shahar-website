/* legal-kit.js - shared legal footer + accessibility widget (Israeli law: privacy, terms, accessibility).
   Add to any page: <script src="/legal-kit.js" defer></script>
   Idempotent: skips the footer / widget when the page already has its own. */
(function () {
  var d = document;
  var ENABLE = 'https://cdn.enable.co.il/licenses/enable-L55207fxnyvjk64g-0526-82161/init.js';

  function init() {
    if (!d.querySelector('a[href*="privacy-policy"]')) {
      var st = d.createElement('style');
      st.textContent =
        '.lk-footer{background:#F7F5F0;color:#555;text-align:center;padding:22px 16px 28px;font-family:"Assistant","Noto Sans Hebrew",Arial,sans-serif;font-size:13px;direction:rtl;border-top:1px solid rgba(0,0,0,.08);}' +
        '.lk-footer a{color:#555;text-decoration:underline;margin:0 8px;}' +
        '.lk-footer p{margin:10px 0 0;color:#777;font-size:12px;}';
      d.head.appendChild(st);
      var f = d.createElement('footer');
      f.className = 'lk-footer';
      f.innerHTML = '<nav aria-label="קישורי מדיניות">' +
        '<a href="/privacy-policy.html">מדיניות פרטיות</a>|' +
        '<a href="/terms.html">תנאי שימוש</a>|' +
        '<a href="/accessibility.html">הצהרת נגישות</a></nav>' +
        '<p>© כל הזכויות שמורות לשחר לוי 2026</p>';
      d.body.appendChild(f);
    }

    var hasWidget = d.getElementById('a11yToggle') || d.getElementById('enable-toolbar') ||
      d.querySelector('script[src*="cdn.enable.co.il"]');
    if (!hasWidget) {
      var s = d.createElement('script');
      s.src = ENABLE; s.defer = true;
      d.head.appendChild(s);
    }
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
