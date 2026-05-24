# הרץ: powershell -ExecutionPolicy Bypass -File setup-github.ps1
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== ContactsYelmNew -> GitHub (atryelm) ===" -ForegroundColor Cyan

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Host "חסר GitHub CLI. התקן: winget install GitHub.cli" -ForegroundColor Red
  exit 1
}

$auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "התחבר ל-GitHub כ-atryelm..." -ForegroundColor Yellow
  gh auth login -h github.com -p https -w
  gh auth setup-git
}

Write-Host "יוצר ריפו atryelm/ContactsYelmNew (public)..." -ForegroundColor Green
gh repo create ContactsYelmNew --public --source=. --remote=origin --push 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "מנסה push לריפו קיים..." -ForegroundColor Yellow
  git remote remove origin 2>$null
  git remote add origin https://github.com/atryelm/ContactsYelmNew.git
  git push -u origin main
}

Write-Host ""
Write-Host "הצלחה!" -ForegroundColor Green
Write-Host "ריפו:  https://github.com/atryelm/ContactsYelmNew"
Write-Host "Pages: https://atryelm.github.io/ContactsYelmNew/ (אחרי Actions)"
Write-Host "הגדר Pages -> GitHub Actions ב-Settings"
Write-Host "ערוך pwa-host/config.js עם כתובת /exec"
