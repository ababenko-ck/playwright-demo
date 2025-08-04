import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { BatchesPage } from '../../pages/batchesPage';
import path from 'path'; 
import fs from 'fs';   

/*
LoginRebrand
click on "Batches" page
wait 3 seconds
click "Open Batches"
wait 1 minute
click "Export"
wait 3 seconds
*/

test('Export Open Batches', async ({ page }) => {
  test.setTimeout(120000); 

  const loginPage = new LoginPage(page);
  const batchesPage = new BatchesPage(page);
  await loginPage.login();
  await batchesPage.navigateToOpenBatches();
  await page.waitForTimeout(20000); 

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