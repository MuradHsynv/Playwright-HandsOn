Playwright Test Automation Framework (TAF) — Hands-on Exercise

Prerequisites:
  
  Node.js v18+
  
  Visual Studio Code (recommended)

Installation:
  
  npm install
  
  npx playwright install

Project layout:
  
  pw-handson/
    playwright.config.js
    fixtures.js
    pages/
      login.page.js
      inventory.page.js
    tests/
      global-setup.js
      ui.spec.js
      mobile.spec.js
      api.spec.js
    state.json

Running the tests:
  
  npm run local
  
  npm run stage (default)
  
  npm run prod
