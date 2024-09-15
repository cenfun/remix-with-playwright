import { expect, test } from './fixture';

test('index', async ({ page }) => {

    console.log('goto', '/');

    await page.goto('/');
    const text = page.getByText('Welcome to Remix');
    await expect(text).toBeVisible();
});


test('test', async ({ page }) => {
    await page.goto('/test');
    const text = page.getByText('Test');
    await expect(text).toBeVisible();
});

test('test covered', async ({ page }) => {
    await page.goto('/test/?covered=1');
    const text = page.getByText('covered');
    await expect(text).toBeVisible();
});

