
import { test, expect } from '@playwright/test';

test('verify cloud development page', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/Services/ai-services.html');
  await page.screenshot({ path: 'ai-services-screenshot.png' });
});
