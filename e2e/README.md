# End-to-End Tests

This directory contains Playwright E2E tests for the Mafia Card Party application.

## Running Tests

- `npm run test:e2e` - Run all E2E tests in headless mode
- `npm run test:e2e:ui` - Run tests with Playwright UI interface

## Test Files

- `app.spec.ts` - Basic E2E tests for the main app page

## Configuration

Playwright configuration is set up in `playwright.config.ts` with:
- Multiple browser engines (Chromium, Firefox, Safari)
- Mobile device testing (Pixel 5, iPhone 12)
- Local dev server auto-start
- HTML reporter for test results

## Writing New Tests

Create new `.spec.ts` files in this directory following the Playwright documentation:
https://playwright.dev/docs/writing-tests
