# Playwright Test Automation Framework (TAF) — Hands-on Exercise

A comprehensive test automation framework built with Playwright for testing [SauceDemo](https://www.saucedemo.com) across multiple browsers, environments, and devices.

## Prerequisites

- **Node.js** v18 or higher
- **Visual Studio Code** (recommended)

## Installation

```bash
npm install
npx playwright install
```

## Environment Setup

Copy the example env file and fill in credentials:

```bash
cp .env.example .env
```

```env
APP_USERNAME=standard_user
APP_PASSWORD=secret_sauce
```

## Project Structure

```
pw-handson/
├── playwright.config.js       # Playwright config (browsers, workers, reporter)
├── fixtures.js                # Custom test fixtures (POM injection)
├── .env / .env.example        # Credentials (gitignored)
├── pages/
│   ├── login.page.js          # Login page object
│   ├── inventory.page.js      # Inventory page object
│   ├── cart.page.js           # Cart page object
│   └── checkout.page.js       # Checkout page object
├── tests/
│   ├── global-setup.js        # Global setup (cookies + login → state.json)
│   ├── ui.spec.js             # UI tests (Login, Inventory, Cart, Checkout)
│   ├── mobile.spec.js         # Mobile viewport tests (iPhone 14 Pro Max)
│   └── api.spec.js            # API tests (JSONPlaceholder)
└── state.json                 # Saved auth state (gitignored, auto-generated)
```

## Running Tests

```bash
npm run stage          # Run all tests in staging (default)
npm run local          # Run against local environment
npm run prod           # Run in production
```

### Run specific projects

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=mobile-safari
npx playwright test --project=api
```

### Run in headed mode

```bash
npx playwright test --headed
```

### View HTML report

```bash
npx playwright show-report
```

## Configuration

| Setting | Value |
|---------|-------|
| Workers | 4 (parallel) |
| Browsers | Chromium, Firefox |
| Mobile | iPhone 14 Pro Max (Safari) |
| Reporter | HTML |
| Screenshot | Only on failure |
| Video | Retained on failure |
| Trace | Retained on failure |
| Retries | 1 on CI, 0 locally |

## Test Scenarios

### UI Tests (`ui.spec.js`)

| Scenario | Actions Used |
|----------|-------------|
| Valid credentials navigate to inventory | `fill()`, `click()` |
| Invalid credentials shows error | `fill()`, `click()` |
| Page title is "Products" | assertion |
| Prices sorted low → high | `selectOption()` |
| Hover over product image | `hover()` |
| Add to cart increments badge | `click()` |
| Verify items in cart | `click()` |
| Remove item from cart | `click()` |
| Continue shopping navigates back | `click()` |
| Checkout button navigates to checkout | `click()` |
| Fill info and complete checkout | `fill()`, `click()` |
| Type info and complete checkout | `pressSequentially()`, `click()` |
| Missing first name shows validation error | `fill()`, `click()` |

### Mobile Test (`mobile.spec.js`)

| Scenario | Actions Used |
|----------|-------------|
| Hamburger menu visible, cart works, logout accessible | `click()`, `hover()` |

### API Tests (`api.spec.js`)

| Scenario | Method |
|----------|--------|
| GET /users returns 200 with user list | GET |
| POST /users creates user and returns 201 | POST |
| GET /users/521 returns 404 | GET |

## Design Patterns

- **Page Object Model (POM)** — Encapsulates locators and actions per page
- **Test Fixtures** — Injects page objects via Playwright's `test.extend()`
- **Global Setup** — Authenticates once, shares session via `storageState`
- **Environment Config** — Multi-env URLs mapped in `playwright.config.js`
- **Credentials from `.env`** — Avoids hardcoded secrets in source
