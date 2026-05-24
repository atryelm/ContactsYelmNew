/**
 * בונה את תיקיית pwa-host/ – PWA אמיתית (GitHub Pages / Firebase וכו')
 * הרצה: node scripts/build-pwa-host.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const gasDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(gasDir, '..');
const pwaDir = path.join(repoRoot, 'pwa-host');
const iconsDir = path.join(pwaDir, 'icons');
const sourcePng = path.join(gasDir, 'assets', 'logo-yeshiva.png');

function escapeScript(s) {
  return s.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
}

async function writeIcons() {
  fs.mkdirSync(iconsDir, { recursive: true });
  if (!fs.existsSync(sourcePng)) {
    console.warn('אזהרה: חסר assets/logo-yeshiva.png – הרץ generate-pwa-icons או העתק אייקונים ידנית ל-pwa-host/icons/');
    return;
  }
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    const { execSync } = await import('child_process');
    execSync('npm install sharp --no-save', { cwd: gasDir, stdio: 'inherit' });
    sharp = (await import('sharp')).default;
  }
  for (const size of [192, 512]) {
    const buf = await sharp(sourcePng)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(iconsDir, `icon-${size}.png`), buf);
  }
  console.log('✓ אייקונים: pwa-host/icons/');
}

function buildIndexHtml(styles, client) {
  let index = fs.readFileSync(path.join(gasDir, 'Index.html'), 'utf8');

  index = index.replace('<base target="_top" />\n    ', '');
  index = index.replace(
    /<link rel="manifest" href="[^"]*" \/>/,
    '<link rel="manifest" href="./manifest.webmanifest" />'
  );
  index = index.replace(
    /<link rel="icon"[^>]*\/>\n    <link rel="shortcut icon"[^>]*\/>\n    <link rel="apple-touch-icon"[^>]*\/>\n    <link rel="apple-touch-icon" sizes="180x180"[^>]*\/>\n    <link rel="apple-touch-icon" sizes="192x192"[^>]*\/>\n    <link rel="apple-touch-icon" sizes="512x512"[^>]*\/>/s,
    [
      '<link rel="icon" type="image/png" sizes="192x192" href="./icons/icon-192.png" />',
      '<link rel="apple-touch-icon" href="./icons/icon-192.png" />',
      '<link rel="apple-touch-icon" sizes="512x512" href="./icons/icon-512.png" />',
    ].join('\n    ')
  );
  index = index.replace(/<meta property="og:image"[^>]*\/>\n    <meta name="twitter:image"[^>]*\/>/s, '');
  index = index.replace(
    /<script type="application\/json" id="brand-logo-bootstrap">[\s\S]*?<\/script>/,
    '<script type="application/json" id="brand-logo-bootstrap">{}</script>'
  );
  index = index.replace('<style><?!= include(\'Styles\'); ?></style>', `<style>${styles}</style>`);
  index = index.replace(
    '<script type="application/json" id="app-config"><?!= getAppConfigJson_() ?></script>',
    `<script type="application/json" id="app-config">${JSON.stringify({
      pwaHost: true,
      manifestUrl: './manifest.webmanifest',
      swUrl: './sw.js',
      scope: './',
    })}</script>`
  );
  index = index.replace(
    '<script type="application/json" id="contacts-bootstrap"><?!= getBootstrapContactsJson_() ?></script>',
    '<script type="application/json" id="contacts-bootstrap">[]</script>'
  );
  index = index.replace(
    '<script><?!= includeScript(\'Client\'); ?></script>',
    `<script src="./config.js"></script>\n    <script>${escapeScript(client)}</script>`
  );

  return index;
}

async function main() {
  fs.mkdirSync(pwaDir, { recursive: true });
  const styles = fs.readFileSync(path.join(gasDir, 'Styles.html'), 'utf8');
  const client = fs.readFileSync(path.join(gasDir, 'Client.html'), 'utf8');
  const index = buildIndexHtml(styles, client);
  fs.writeFileSync(path.join(pwaDir, 'index.html'), index, 'utf8');

  const configPath = path.join(pwaDir, 'config.js');
  if (!fs.existsSync(configPath)) {
    fs.copyFileSync(path.join(pwaDir, 'config.example.js'), configPath);
    console.log('נוצר config.js – ערוך והדבק כתובת /exec');
  }

  await writeIcons();
  console.log('נוצר:', path.join(pwaDir, 'index.html'));
  console.log('פרוס את תיקיית pwa-host/ ל-GitHub Pages / Firebase Hosting');
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
