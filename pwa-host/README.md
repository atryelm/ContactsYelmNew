# PWA אמיתית – התקנה כאפליקציה

Chrome **לא** מאפשר «התקן אפליקציה» מכתובת `script.google.com` (רק קיצור דרך).
הפתרון: מארח את הממשק כאן, ו-Google Apps Script משמש רק כ-API.

## הכנה (פעם אחת)

1. ב-Apps Script: עדכן `Code.gs` מהפרויקט → **Deploy → New version**
2. העתק את כתובת ה-Web App (**`/exec`**)
3. במחשב:
   ```bash
   cd google-apps-script
   node scripts/build-pwa-host.mjs
   ```
4. ערוך `pwa-host/config.js` – הדבק את כתובת ה-`/exec`

## פריסה (בחר אחת)

### GitHub Pages (אוטומטי)

1. דחוף ל-`https://github.com/atryelm/ContactsYelmNew`
2. Settings → Pages → Source: **GitHub Actions** (כבר מוגדר ב-workflow)
3. אחרי Push ראשון: פתח `https://atryelm.github.io/ContactsYelmNew/`
4. ערוך ב-GitHub את `pwa-host/config.js` – הדבק כתובת `/exec` מ-Apps Script

### Firebase Hosting

```bash
cd pwa-host
npx firebase init hosting
# public directory: .
firebase deploy
```

### Netlify

גרור את תיקיית `pwa-host` ל-[Netlify Drop](https://app.netlify.com/drop)

## התקנה בטלפון

1. פתח את האתר מהדומיין שלך (לא מ-script.google.com)
2. Chrome: **⋮ → התקן אפליקציה** (או כפתור «התקנה» באפליקציה)
3. אייפון: Safari → שיתוף → **הוסף למסך הבית**

## בדיקה

ב-Chrome: DevTools → Application → Manifest – אין שגיאות אדומות; Service Worker רשום.
