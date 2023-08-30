import { defineConfig } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  timeout: 30000,
  globalTimeout: 600000,
  reporter: [['list'], ['html']],
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  use: {
    /* Base URL for the weatherbit api */
    baseURL: `https://api.weatherbit.io/v2.0/`,
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
    trace: 'retain-on-failure',
  },
})
