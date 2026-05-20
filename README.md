# Playwright Test Automation Framework (TAF) — Hands-on Exercise

A comprehensive test automation framework built with Playwright for testing web applications across multiple environments and devices.

## Prerequisites

- **Node.js** v18 or higher
- **Visual Studio Code** (recommended)

## Installation

```bash
npm install
npx playwright install
```

## Project Structure

```
pw-handson/
├── playwright.config.js      # Playwright configuration
├── fixtures.js               # Shared test fixtures
├── pages/
│   ├── login.page.js        # Login page object
│   └── inventory.page.js    # Inventory page object
├── tests/
│   ├── global-setup.js      # Global setup configuration
│   ├── ui.spec.js           # UI tests
│   ├── mobile.spec.js       # Mobile tests
│   └── api.spec.js          # API tests
└── state.json               # Test state file
```

## Running Tests

Run tests in different environments:

```bash
npm run local          # Run locally
npm run stage          # Run in staging (default)
npm run prod           # Run in production
```

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Mobile device emulation
- API testing capabilities
- Reusable page objects
- Global setup and state management
