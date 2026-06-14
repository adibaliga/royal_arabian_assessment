import { test, expect } from "@playwright/test";

test.describe("Package Detail Pages", () => {
  const packages = [
    { slug: "china-highlights-tour", name: "China Highlights Tour" },
    { slug: "shanghai-express", name: "Shanghai Express" },
    { slug: "yangtze-river-cruise", name: "Yangtze River Cruise" },
  ];

  for (const pkg of packages) {
    test(`renders ${pkg.slug} with all sections`, async ({ page }) => {
      const response = await page.goto(`/cn/packages/${pkg.slug}`);
      expect(response?.ok()).toBeTruthy();

      await expect(page.locator("h1")).toContainText(pkg.name);
      await expect(page.locator("text=What's Included")).toBeVisible();
      await expect(page.locator("text=Itinerary")).toBeVisible();
      await expect(page.locator("text=Good to Know")).toBeVisible();
    });
  }

  test("itinerary shows day numbers", async ({ page }) => {
    await page.goto("/cn/packages/china-highlights-tour");

    for (let i = 1; i <= 8; i++) {
      const day = String(i).padStart(2, "0");
      await expect(page.locator(`text=${day}`).first()).toBeVisible();
    }
  });

  test("Enquire Now button opens the modal", async ({ page }) => {
    await page.goto("/cn/packages/china-highlights-tour");

    const enquireBtn = page.getByRole("main").getByRole("button", { name: "Enquire Now" });
    await enquireBtn.click();

    await expect(page.locator("text=Submit Enquiry")).toBeVisible();
  });
});
