const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const filePath = path.resolve(process.cwd(), 'index.html');

  await page.goto(`file://${filePath}`);

  // Navigate through the mega menu to the cloud development page
  await page.click('a[data-menu="services"]');
  await page.click('a[data-category="cloud"]');
  await page.click('a[href="Services/cloud-development-services.html"]');

  await page.screenshot({ path: 'verification.png' });

  await browser.close();
})();
