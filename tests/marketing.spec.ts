import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const storeURL = "https://apps.microsoft.com/detail/9MSSHHFC8D3R";
const routes = ["/", "/privacy", "/support"];

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document, JSON.stringify(dimensions)).toBeLessThanOrEqual(
    dimensions.viewport + 1,
  );
  expect(dimensions.body, JSON.stringify(dimensions)).toBeLessThanOrEqual(
    dimensions.viewport + 1,
  );
}

for (const width of [375, 768, 1440]) {
  test(`all pages fit a ${width}px viewport`, async ({ page }, testInfo) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: width === 375 ? 812 : 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expectNoHorizontalOverflow(page);
      if (route === "/") {
        const visibleStoreLinks = page.locator(`a[href="${storeURL}"]:visible`);
        await expect(visibleStoreLinks.first()).toBeInViewport();
        for (const image of await page.locator("main img:visible").all()) {
          await image.evaluate((element) =>
            element.scrollIntoView({ behavior: "instant", block: "center" }),
          );
          await expect(image).not.toHaveJSProperty("naturalWidth", 0, { timeout: 15_000 });
        }
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({
          path: testInfo.outputPath(`homepage-${width}.png`),
          fullPage: true,
        });
        await page.screenshot({
          path: testInfo.outputPath(`hero-${width}.png`),
        });
      }
    }
  });
}

test("all download actions use the official Microsoft Store listing", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    const downloadLinks = page.getByRole("link", {
      name: /Get DropMate Lite|Download for Windows|Microsoft Store/i,
    });
    expect(await downloadLinks.count()).toBeGreaterThanOrEqual(2);
    for (const link of await downloadLinks.all()) {
      await expect(link).toHaveAttribute("href", storeURL);
      if ((await link.getAttribute("target")) === "_blank") {
        await expect(link).toHaveAttribute("rel", /noopener/);
      }
    }
    await expect(page.locator("a[download]")).toHaveCount(0);
  }
});

test("mobile navigation supports links and Escape with focus restoration", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Open menu", exact: true });
  await opener.focus();
  await page.keyboard.press("Enter");
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  const mobileAccessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(mobileAccessibility.violations).toEqual([]);
  await menu.getByRole("link", { name: "Features", exact: true }).click();
  await expect(page).toHaveURL(/\/#features$/);
  await expect(menu).toBeHidden();
  await opener.click();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(opener).toBeFocused();
  await expectNoHorizontalOverflow(page);
});

test("FAQ can be expanded and collapsed using the keyboard", async ({
  page,
}) => {
  await page.goto("/#faq");
  const question = page
    .locator("summary")
    .filter({ hasText: "Does DropMate Lite require an account?" });
  const answer = page.locator("details").filter({ has: question });
  await expect(question).toBeVisible();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(answer).toHaveAttribute("open", "");
  await expect(answer).toContainText(/without|no account/i);
  await page.keyboard.press("Space");
  await expect(answer).not.toHaveAttribute("open", "");
  await expect(page.locator("summary")).toHaveCount(11);
});

test("screenshot gallery switches views and restores focus after closing its dialog", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Home", exact: true }).focus();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("tab", { name: "History", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("tab", { name: "Home", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Send", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  const expand = page.getByRole("button", {
    name: "Expand screenshot",
    exact: true,
  });
  await expand.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName(/.+/);
  expect(await dialog.evaluate((element) => element.matches(":modal"))).toBe(true);
  await expect(dialog.getByRole("button", { name: "Close preview", exact: true })).toBeFocused();
  const preview = dialog.getByRole("img");
  await expect(preview).toHaveAttribute("alt", /.+/);
  await expect(preview).toHaveJSProperty("complete", true);
  await expect(preview).not.toHaveJSProperty("naturalWidth", 0);
  const dialogAccessibility = await new AxeBuilder({ page })
    .include("dialog[open]")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(dialogAccessibility.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(expand).toBeFocused();
  await expand.press("Enter");
  await dialog
    .getByRole("button", { name: "Close preview", exact: true })
    .click();
  await expect(dialog).toBeHidden();
  await expect(expand).toBeFocused();
});

test("leaving an open gallery through browser Back restores page scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/support");
  await page.getByRole("link", { name: "DropMate Lite home", exact: true }).first().click();
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole("button", { name: "Expand screenshot", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/support$/);
  await expect(page.getByRole("heading", { name: "DropMate Lite Support", exact: true })).toBeVisible();
  expect(await page.locator("body").evaluate((element) => getComputedStyle(element).overflow)).not.toBe("hidden");
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test("privacy and support are reachable and include useful contact information", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Privacy", exact: true })
    .click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy Policy",
  );
  await expect(page.getByRole("main")).toContainText("October 4, 2026");
  await expect(page.getByRole("main")).toContainText("Christian Kwame");
  await expect(
    page.getByRole("main").getByRole("link", { name: "co3866307@gmail.com" }),
  ).toHaveAttribute("href", "mailto:co3866307@gmail.com");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Support", exact: true })
    .click();
  await expect(page).toHaveURL(/\/support$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "DropMate Lite Support",
  );
  await expect(page.getByRole("main")).toContainText("Downloads\\DropMate");
  await expect(
    page.getByRole("main").getByRole("link", { name: /co3866307@gmail.com/ }),
  ).toHaveAttribute("href", "mailto:co3866307@gmail.com");
});

for (const route of routes) {
  test(`${route} has page-specific metadata without localhost SEO URLs`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(page).toHaveTitle(
      route === "/"
        ? "DropMate Lite — Fast Phone & PC File Transfer"
        : route === "/privacy"
          ? "Privacy Policy | DropMate Lite"
          : "Support | DropMate Lite",
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /DropMate Lite/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /DropMate Lite/,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count()) {
      const url = await canonical.getAttribute("href");
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toMatch(/localhost|127\.0\.0\.1/);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        /^https:\/\/.+\/og\/dropmate-og\.png$/,
      );
    } else {
      // A domain is not invented for local builds; their indexing is disabled.
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
    }
    const robots = await page.request.get("/robots.txt");
    const sitemap = await page.request.get("/sitemap.xml");
    expect(robots.ok()).toBe(true);
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain("<urlset");
    expect(await sitemap.text()).not.toMatch(/localhost|127\.0\.0\.1/);
  });

  test(`${route} passes automated WCAG accessibility checks`, async ({
    page,
  }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("brand and screenshot assets are served as real image files", async ({
  request,
}) => {
  const assets = [
    "/logo.svg",
    "/logo.png",
    "/favicon.ico",
    "/og/dropmate-og.png",
    ...[
      "hero-app",
      "home",
      "send",
      "qr",
      "transfer",
      "history",
      "mobile-transfer",
    ].map((name) => `/screenshots/${name}.png`),
  ];
  for (const asset of assets) {
    const response = await request.get(asset);
    expect(response.ok(), asset).toBe(true);
    expect(response.headers()["content-type"], asset).toMatch(/image\//);
    expect((await response.body()).byteLength, asset).toBeGreaterThan(100);
  }
});

test("page browsing makes no third-party resource requests or runtime errors", async ({
  page,
  baseURL,
}) => {
  const remoteRequests: string[] = [];
  const runtimeErrors: string[] = [];
  const origin = new URL(baseURL!).origin;
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["http:", "https:"].includes(url.protocol) && url.origin !== origin)
      remoteRequests.push(request.url());
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState("networkidle");
  }
  expect(remoteRequests).toEqual([]);
  expect(runtimeErrors).toEqual([]);
});
