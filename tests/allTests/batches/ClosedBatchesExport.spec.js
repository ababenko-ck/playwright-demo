import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';
import path from 'path';
import fs from 'fs';

/*
LoginRebrand
click on "Batches" page
wait 1 minute (replaced by dynamic wait)
click on "Export"
wait 3 seconds
*/

test('Export Closed Batches', async ({ page }) => {
  test.setTimeout(120000);

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);

  await loginPage.login();
  await batchesPage.goToClosedBatchesDirectly();
  console.log('Relying on dynamic waiting for batch data to load before export...');

  const firstBatchId = await batchesPage.getFirstOpenBatchId(); 
  expect(firstBatchId).not.toBeNull();
  expect(firstBatchId).not.toBe('');
  console.log(`First batch ID found: ${firstBatchId}. Data should be loaded.`);
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30000 }),
    batchesPage.clickExportButton()
  ]);
  
  await page.waitForTimeout(3000);
  expect(download).toBeDefined();
  const suggestedFileName = download.suggestedFilename();
  console.log(`Suggested file name: ${suggestedFileName}`);

  expect(suggestedFileName).toMatch(/\.(csv|xlsx|pdf)$/i);
  const downloadsPath = path.resolve(__dirname, '../../temp_downloads');
  if (!fs.existsSync(downloadsPath)) {
    fs.mkdirSync(downloadsPath, { recursive: true });
  }
  const filePath = path.join(downloadsPath, suggestedFileName);
  await download.saveAs(filePath);
  console.log(`File saved to: ${filePath}`);

  expect(fs.existsSync(filePath)).toBeTruthy();
  console.log('Export button clicked, download verified, and waits completed.');
});
