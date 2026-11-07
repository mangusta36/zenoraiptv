# Zenora browser coverage

## Status

No route/viewport combination was browser-verified in this audit (0 of 57 build routes × 4 requested viewports). Chromium exists at `/usr/bin/chromium`, but no Playwright, Cypress, browser MCP, or project browser-test harness was present. No attempt was made to substitute static screenshots for interaction testing.

## Required future matrix

Viewports: 375×844, 390×844, 768×1024, 1440×900.

Routes to cover: `/`, `/features`, `/pricing`, `/devices`, `/channels`, `/setup`, eight `/setup/*` routes, `/blog`, all 19 `/blog/[slug]` pages, `/faq`, `/contact`, `/trial`, `/checkout`, `/order/status`, `/order/success`, `/renew`, `/support`, legal routes, 404 and error boundary.

Interactions required: desktop and mobile nav; pricing connection selection; channels search/filter; FAQ accordions; contact/trial/order demo disclosure states; checkout disabled payment state and WhatsApp links; internal navigation; keyboard skip-link/menu/focus flow. Record screenshots, console messages, failed requests and image load results per route.
