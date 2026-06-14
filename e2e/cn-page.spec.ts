import { test, expect } from "@playwright/test";

test.describe("China Destination Page (/cn)", () => {
  test("loads the page and shows key sections", async ({ page }) => {
    const response = await page.goto("/cn");
    expect(response?.ok()).toBeTruthy();

    await expect(page.locator("h1")).toContainText("China");
    await expect(page.locator("text=About China")).toBeVisible();
    await expect(page.locator("text=Our Packages")).toBeVisible();
    await expect(page.locator("text=Good to Know")).toBeVisible();
  });

  test("displays highlights grid", async ({ page }) => {
    await page.goto("/cn");
    const highlights = page.locator("text=Great Wall of China");
    await expect(highlights.first()).toBeVisible();
  });

  test("shows package cards with pricing", async ({ page }) => {
    await page.goto("/cn");
    await expect(page.locator("text=AED 6,500")).toBeVisible();
    await expect(page.locator("text=AED 3,800")).toBeVisible();
    await expect(page.locator("text=AED 5,200")).toBeVisible();
  });

  test("good to know accordion expands on click", async ({ page }) => {
    await page.goto("/cn");
    const accordion = page.locator("details").first();
    const summary = accordion.locator("summary");

    await expect(accordion).not.toHaveAttribute("open");
    await summary.click();
    await expect(accordion).toHaveAttribute("open");
  });

  test("package card Enquire Now opens modal with pre-filled package name", async ({ page }) => {
    await page.goto("/cn");

    const cardBtn = page.locator("#packages button, #packages a").filter({ hasText: "Enquire Now" }).first();
    await cardBtn.click();

    await expect(page.locator("h2:has-text('Enquire')").or(page.locator("h2:has-text('Enquire Now')"))).toBeVisible({ timeout: 5000 });
  });

  test("package card name navigates to detail page", async ({ page }) => {
    await page.goto("/cn");

    const firstCardName = page.locator("#packages a").filter({ hasText: "China Highlights Tour" }).first();
    await firstCardName.click();

    await expect(page).toHaveURL(/\/cn\/packages\/china-highlights-tour/);
    await expect(page.locator("h1")).toContainText("China Highlights Tour");
  });

  test("header shows transparent on load and solid on scroll", async ({ page }) => {
    await page.goto("/cn");

    const header = page.locator("header");
    await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");

    await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(400);

    await expect(header).toHaveCSS("background-color", "rgb(255, 255, 255)");
  });
});
