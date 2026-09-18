const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const svgPath = 'file:///' + path.resolve(process.argv[2]).replace(/\\/g, '/');
  const out = process.argv[3];
  const w = parseInt(process.argv[4] || '1200', 10);
  const h = parseInt(process.argv[5] || '320', 10);

  const browser = await chromium.launch({
    executablePath: 'C:/Users/Lacia/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe',
  });
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: 2,
  });
  await page.goto(svgPath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: out, omitBackground: true });
  await browser.close();
  console.log('OK -> ' + out);
})();
