import { test, expect } from "@playwright/test";

test.describe("Enquiry Flow", () => {
  test("header Enquire Now opens the form modal", async ({ page }) => {
    await page.goto("/cn");

    const headerBtn = page.locator("header button", { hasText: "Enquire Now" });
    await headerBtn.click();

    await expect(page.locator("h2:has-text('Enquire Now')")).toBeVisible();
    await expect(page.locator('input[id="name"]')).toBeVisible();
    await expect(page.locator('input[id="email"]')).toBeVisible();
  });

  test("submits enquiry successfully", async ({ page }) => {
    await page.goto("/cn");

    const headerBtn = page.locator("header button", { hasText: "Enquire Now" });
    await headerBtn.click();

    await page.fill('input[id="name"]', "E2E Test User");
    await page.fill('input[id="email"]', "e2e@test.com");
    await page.fill('input[id="phone"]', "+971501234567");
    await page.fill('textarea[id="message"]', "Test message from Playwright");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Thank You!")).toBeVisible({
      timeout: 10000,
    });
  });

  test("closes modal and reopens fresh", async ({ page }) => {
    await page.goto("/cn");

    const headerBtn = page.locator("header button", { hasText: "Enquire Now" });
    await headerBtn.click();
    await expect(page.locator("h2:has-text('Enquire Now')")).toBeVisible();

    await page.click('button[aria-label="Close"]');
    await expect(page.locator("h2:has-text('Enquire Now')")).not.toBeVisible();

    await headerBtn.click();
    await expect(page.locator("h2:has-text('Enquire Now')")).toBeVisible();
  });
});
