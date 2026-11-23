import { defineConfig, devices } from '@playwright/test';
const dotenv = require('dotenv');
const path = require('path');

const env = process.env.ENV || 'qa';
dotenv.config({ path: path.resolve(__dirname, `config/.env.${env}`) });


export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    tieout: 30_000
  },

  use: {
    baseURL: process.env.BASE_URL,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'off',
    video: 'on'
  },


  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});

