# אנשי קשר – ישיבת אלון מורה

אפליקציית אנשי קשר מבוססת **Google Apps Script** + **Google Sheets**.

## תיקייה

כל הקוד נמצא ב-[`google-apps-script/`](google-apps-script/)

## התקנה מהירה

1. פתח [Google Apps Script](https://script.google.com) וצור פרויקט חדש
2. העתק `Code.gs` מהתיקייה
3. צור קובץ HTML בשם `Index` – העתק את `Index-להדבקה-ב-AppsScript.html`
4. Deploy → Web app → Anyone

פרטים: [`google-apps-script/הוראות-התקנה.md`](google-apps-script/הוראות-התקנה.md)

## בניית קובץ Index מאוחד

```bash
cd google-apps-script
node scripts/build-index.mjs
```

## התקנה כאפליקציה אמיתית (לא רק קיצור דרך)

מ-`script.google.com` Chrome מאפשר רק **קיצור דרך**. להתקנה מלאה («התקן אפליקציה»):

```bash
cd google-apps-script
node scripts/build-pwa-host.mjs
```

ערוך `pwa-host/config.js` עם כתובת ה-`/exec`, ופרוס את `pwa-host/` ל-**GitHub Pages** / Firebase / Netlify.

פרטים: [`pwa-host/README.md`](pwa-host/README.md)
