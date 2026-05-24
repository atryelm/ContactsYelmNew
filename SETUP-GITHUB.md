# העלאה ל-GitHub – חשבון `atryelm`

הפרויקט מוכן מקומית (commit על branch `main`).
נשאר רק להתחבר ל-GitHub ולדחוף.

## שלב 1 – התנתקות מהחשבון הישן (אם צריך)

בטרמינל:

```powershell
gh auth logout
```

## שלב 2 – התחברות ל-`atryelm`

```powershell
cd C:\Users\rughc\AndroidStudioProjects\ContactsYelmNew
gh auth login
```

בחר:

1. **GitHub.com**
2. **HTTPS**
3. **Login with a web browser**
4. העתק קוד → התחבר בדפדפן כ-**atryelm**

אחר כך:

```powershell
gh auth setup-git
```

## שלב 3 – יצירת הריפו ודחיפה

```powershell
cd C:\Users\rughc\AndroidStudioProjects\ContactsYelmNew
gh repo create ContactsYelmNew --public --source=. --remote=origin --push
```

אם הריפו כבר קיים ב-GitHub:

```powershell
git remote add origin https://github.com/atryelm/ContactsYelmNew.git
git push -u origin main
```

## שלב 4 – GitHub Pages

1. פתח: https://github.com/atryelm/ContactsYelmNew/settings/pages
2. **Build and deployment** → Source: **GitHub Actions**
3. אחרי ה-Push, ה-workflow `Deploy PWA to GitHub Pages` ירוץ אוטומטית
4. האתר: **https://atryelm.github.io/ContactsYelmNew/**

## שלב 5 – חיבור ל-Apps Script

1. ב-GitHub ערוך: `pwa-host/config.js`
2. הדבק כתובת Web App (`.../exec`) מ-Apps Script
3. Commit

## שלב 6 – התקנה בטלפון

פתח `https://atryelm.github.io/ContactsYelmNew/` → Chrome → **התקן אפליקציה**
