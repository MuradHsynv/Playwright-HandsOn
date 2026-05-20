import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/** @type {Record<string, string>} */
const environments = {
  local: 'http://localhost:3000',
  stage: 'https://www.saucedemo.com',
  prod: 'https://www.saucedemo.com',
};

/** @type {Record<string, string>} */
const apis = {
  local: 'http://localhost:5000',
  stage: 'https://jsonplaceholder.typicode.com',
  prod: 'https://jsonplaceholder.typicode.com',
};

const currentEnv = process.env.TEST_ENV || 'stage';
const baseURL = environments[currentEnv];
const apiURL = apis[currentEnv];

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 4,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'global-setup.js',
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'state.json',
      },
      dependencies: ['setup'],
      testIgnore: ['mobile.spec.js', 'api.spec.js'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'state.json',
      },
      dependencies: ['setup'],
      testIgnore: ['mobile.spec.js', 'api.spec.js'],
    },
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 14 Pro Max'],
        storageState: 'state.json',
      },
      dependencies: ['setup'],
      testMatch: 'mobile.spec.js',
    },
    {
      name: 'api',
      use: { baseURL: apiURL },
      testMatch: 'api.spec.js',
    },
  ],
});

