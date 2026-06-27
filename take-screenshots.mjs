import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const BASE = 'http://localhost:5173';
const OUT = '/home/eightarch/Projects/App_TopUp_Game/Gambar';

const pages = [
  { name: '1.png', url: BASE + '/', description: 'Beranda - Halaman utama' },
  { name: '2.png', url: BASE + '/DiamondMl', description: 'Mobile Legends - Top up' },
  { name: '3.png', url: BASE + '/DiamondEpep', description: 'Free Fire - Top up' },
  { name: '4.png', url: BASE + '/DiamonHok', description: 'Honor of Kings - Top up' },
  { name: '5.png', url: BASE + '/login', description: 'Login Admin' },
];

const browser = await chromium.launch({ headless: true });

for (const page of pages) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage();
  try {
    await p.goto(page.url, { waitUntil: 'networkidle', timeout: 15000 });
    await p.waitForTimeout(2000);
    await p.screenshot({ path: `${OUT}/${page.name}`, fullPage: true });
    console.log(`✅ ${page.name} — ${page.description}`);
  } catch (e) {
    console.error(`❌ ${page.name} — ${e.message}`);
  }
  await ctx.close();
}

// Admin dashboard — perlu login dulu
const adminCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const adminPage = await adminCtx.newPage();
try {
  await adminPage.goto(BASE + '/login', { waitUntil: 'networkidle', timeout: 15000 });
  await adminPage.waitForTimeout(1500);
  // Login manual via form
  await adminPage.fill('input[name="email"]', 'admin@example.com');
  await adminPage.fill('input[type="password"]', 'admin123');
  await adminPage.click('button[type="submit"]');
  await adminPage.waitForTimeout(3000);
  // Screenshot dashboard
  await adminPage.screenshot({ path: `${OUT}/6.png`, fullPage: true });
  console.log('✅ 6.png — Dashboard Admin');
} catch (e) {
  console.error(`❌ 6.png — Dashboard Admin: ${e.message}`);
}
await adminCtx.close();

await browser.close();
console.log('\n🎉 Semua screenshot selesai!');
