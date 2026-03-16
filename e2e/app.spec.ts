import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('should display the app title', async ({ page }) => {
  const title = page.locator('h1')
  await expect(title).toContainText('Mafia Card Party')
})

test('should render the counter button with initial count', async ({ page }) => {
  const button = page.locator('button')
  await expect(button).toContainText('count is 0')
})

test('should increment counter on button click', async ({ page }) => {
  const button = page.locator('button')

  // Initial state
  await expect(button).toContainText('count is 0')

  // Click once
  await button.click()
  await expect(button).toContainText('count is 1')

  // Click again
  await button.click()
  await expect(button).toContainText('count is 2')

  // Click again
  await button.click()
  await expect(button).toContainText('count is 3')
})

test('should display the vite + react message', async ({ page }) => {
  const message = page.locator('p').filter({ hasText: /Edit.*and save to test HMR/ })
  await expect(message).toBeVisible()
})

test('should display the learn more section', async ({ page }) => {
  const learnMore = page.locator('p').filter({ hasText: /Click on the Vite and React logos/ })
  await expect(learnMore).toBeVisible()
})

test('should have proper page title', async ({ page }) => {
  await expect(page).toHaveTitle('Mafia Card Party')
})
