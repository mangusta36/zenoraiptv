#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")/../.."
command -v node >/dev/null || { echo "Node.js is required." >&2; exit 1; }
command -v npm >/dev/null || { echo "npm is required." >&2; exit 1; }
echo "Node: $(node -v); npm: $(npm -v)"
if [ ! -d node_modules/@playwright/test ] || [ ! -d node_modules/@axe-core/playwright ]; then
  npm install --save-dev @playwright/test@1.58.2 @axe-core/playwright@4.11.0 --no-audit --no-fund
fi
npx playwright install chromium
node -e "const { chromium } = require('@playwright/test'); console.log(chromium.executablePath())"
