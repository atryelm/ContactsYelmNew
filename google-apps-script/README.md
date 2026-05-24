# אנשי קשר – Google Apps Script

**גיליון:** https://docs.google.com/spreadsheets/d/12hQCr-rC7s85paLM4mx1u4Vv9mwVjmBCGVLiuphSqog/

| הגדרה | ערך |
|--------|-----|
| שם טאב | `אנשי קשר` |
| עמודות | id · שם פרטי · שם משפחה · טלפון · אימייל |
| פורמט טלפון | `058-1234567` |

## קבצים

| קובץ | תפקיד |
|------|--------|
| `Code.gs` | שרת + גיליון |
| `Index.html` + `Styles.html` + `Client.html` | מקור לפיתוח |
| `Index-להדבקה-ב-AppsScript.html` | **להדבקה ב-Apps Script** (קובץ אחד) |

## התקנה

ראה [הוראות-התקנה.md](./הוראות-התקנה.md)

## בניית קובץ מאוחד

```bash
node scripts/build-index.mjs
```

## הגדרת Properties (פעם ראשונה)

ב-Apps Script הרץ את הפונקציה **`setupScriptProperties`** (פעם אחת).  
אחר כך ניתן לעדכן ערכים ב: Project Settings → Script properties.

## סיסמת ניהול

ברירת מחדל: `156360` (מוגדר ב-Properties) – הוספה, ייבוא, ניקוי כפילויות (🔒)

## תכונות

- חיפוש חכם (שם, טלפון, אימייל)
- ללא כפילויות (לפי מספר טלפון)
- שמירה בטלפון (vCard)
- התקנה למסך הבית (PWA)
- ייצוא vCard
