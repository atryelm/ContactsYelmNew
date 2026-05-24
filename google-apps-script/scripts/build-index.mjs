/**
 * בונה Index-להדבקה-ב-AppsScript.html
 * הלוגו ב-brand-logo-bootstrap (JSON) + JS – לא ב-src של img
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const gasDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function main() {
  const indexTpl = fs.readFileSync(path.join(gasDir, 'Index.html'), 'utf8');
  const styles = fs.readFileSync(path.join(gasDir, 'Styles.html'), 'utf8');
  let client = fs.readFileSync(path.join(gasDir, 'Client.html'), 'utf8');

  client = client
    .replace(/<\/script/gi, '<\\/script')
    .replace(/<!--/g, '<\\!--');

  let out = indexTpl
    .replace("<?!= include('Styles'); ?>", styles)
    .replace('<?!= includeScript(\'Client\'); ?>', client)
    .replace(/<\?!= include\('Styles'\); \?>/g, styles)
    .replace(/<\?!= includeScript\('Client'\); \?>/g, client);

  const outPath = path.join(gasDir, 'Index-להדבקה-ב-AppsScript.html');
  fs.writeFileSync(outPath, out, 'utf8');
  const hasLogo = out.includes('brand-logo-bootstrap') && out.includes('__logoFallback');
  console.log('נוצר:', outPath);
  console.log(hasLogo ? '✓ לוגו: brand-logo-bootstrap + JS' : '✗ חסר לוגו');
}

main();
