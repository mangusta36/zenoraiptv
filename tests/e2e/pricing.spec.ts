import { expect, test } from "@playwright/test";

const durations = [
  { id: "1", label: "1 Month" },
  { id: "3", label: "3 Months" },
  { id: "6", label: "6 Months" },
  { id: "12", label: "12 Months" },
] as const;

const prices = {
  1: [23, 37, 47, 67],
  2: [39, 63, 80, 114],
  3: [78, 126, 160, 228],
  4: [117, 189, 240, 342],
  5: [156, 252, 320, 456],
  6: [196, 315, 399, 570],
} as const;

const richBenefits = [
  "Live channel categories where available",
  "Movie and series categories where available",
  "Picture quality depends on the content, player, device, and connection",
  "Smart TV and streaming-device guidance",
  "Fire TV and Android TV setup guides",
  "Mobile and desktop setup paths",
  "Device compatibility checks",
  "M3U, Xtream Codes, and portal setup concepts",
  "Setup guidance through the verified support route",
  "Troubleshooting resources",
  "Renewal assistance for existing customers",
];

test("pricing page matches the complete verified price matrix and checkout messages", async ({
  page,
}) => {
  await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: "How many devices will need a stream?" }),
  ).toBeVisible();
  await expect(
    page.getByRole("table", {
      name: /configured zenora new-subscription options/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "6 Devices" })).toBeVisible();

  for (const connections of [1, 2, 3, 4, 5, 6] as const) {
    await page
      .getByRole("button", {
        name: `${connections} ${connections === 1 ? "Device" : "Devices"}`,
      })
      .click();
    await expect(
      page.getByText(
        `Showing every duration with ${connections} simultaneous connection${connections > 1 ? "s" : ""}.`,
      ),
    ).toBeVisible();
    for (const [index, duration] of durations.entries()) {
      const card = page.locator(".pricing-plan-grid .price").nth(index);
      const total = prices[connections][index].toString();
      await expect(card).toContainText(`$${total}`);
      await expect(card).toContainText(
        `${connections} simultaneous stream${connections > 1 ? "s" : ""} in this plan`,
      );
      await expect(card.locator(".price-inclusions li")).toHaveCount(
        duration.id === "12" ? 13 : 12,
      );
      for (const benefit of richBenefits)
        await expect(card).toContainText(benefit);
      const checkout = card.getByRole("link", { name: /choose plan:/i });
      const href = await checkout.getAttribute("href");
      expect(href).toBeTruthy();
      const message = new URL(href!).searchParams.get("text") || "";
      expect(message).toContain(`Connections: ${connections}`);
      expect(message).toContain(`Price: $${total}`);
      if (duration.id === "12") {
        await expect(card).toContainText("12 Months + 2 Months FREE");
        await expect(card).toContainText("14 months total");
        expect(message).toContain("Plan: 12 Months + 2 Months FREE");
        expect(message).toContain("Paid plan: 12 months");
        expect(message).toContain("Bonus: 2 free months");
        expect(message).toContain("Total subscription duration: 14 months");
      } else {
        await expect(card).not.toContainText("14 months total");
      }
    }
    const annualComparison = page.getByRole("row", { name: /12 months/i });
    await expect(annualComparison).toContainText(
      "2 months free · 14 months total",
    );
  }
});

test("homepage uses the same six-device price matrix", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  for (const connections of [1, 2, 3, 4, 5, 6] as const) {
    await page
      .getByRole("button", {
        name: `${connections} ${connections === 1 ? "Device" : "Devices"}`,
      })
      .click();
    for (const [index, total] of prices[connections].entries()) {
      const card = page.locator(".prices .price").nth(index);
      await expect(card).toContainText(`$${total}`);
      const message =
        new URL(
          (await card
            .getByRole("link", { name: /choose plan:/i })
            .getAttribute("href"))!,
        ).searchParams.get("text") || "";
      expect(message).toContain(`Connections: ${connections}`);
      expect(message).toContain(`Price: $${total}`);
      if (index === 3) {
        await expect(card).toContainText("12 Months + 2 Months FREE");
        await expect(card).toContainText("14 months total");
      }
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBeTruthy();
  }
});

test("checkout preview accepts all six connection counts and matches configured totals", async ({
  page,
}) => {
  for (const connections of [1, 2, 3, 4, 5, 6] as const) {
    for (const [index, duration] of durations.entries()) {
      await page.goto(
        `/checkout?duration=${duration.id}&connections=${connections}`,
        { waitUntil: "domcontentloaded" },
      );
      await expect(
        page.getByText(
          `Selected connections: ${connections} connection${connections > 1 ? "s" : ""}`,
        ),
      ).toBeVisible();
      await expect(
        page.getByText(`$${prices[connections][index]}`, { exact: true }),
      ).toBeVisible();
      if (duration.id === "12") {
        await expect(
          page.getByText("12 Months + 2 Months FREE", { exact: true }),
        ).toBeVisible();
        await expect(
          page.getByText("Paid plan: 12 months", { exact: true }),
        ).toBeVisible();
        await expect(
          page.getByText("Bonus: 2 free months", { exact: true }),
        ).toBeVisible();
        await expect(
          page.getByText("Total subscription duration: 14 months", {
            exact: true,
          }),
        ).toBeVisible();
      } else {
        await expect(
          page.getByText(`Subscription duration: ${duration.label}`, {
            exact: true,
          }),
        ).toBeVisible();
        await expect(
          page.getByText("Bonus: 2 free months", { exact: true }),
        ).toHaveCount(0);
      }
    }
  }
});

test("pricing page visual evidence includes the expanded cards", async ({
  page,
}, testInfo) => {
  await page.goto("/pricing", { waitUntil: "networkidle" });
  await expect(
    page
      .locator(".pricing-plan-grid .price")
      .first()
      .locator(".price-inclusions li"),
  ).toHaveCount(12);
  await page.screenshot({
    path: `docs/audits/results/pricing-${testInfo.project.name}.png`,
    fullPage: true,
  });
});
