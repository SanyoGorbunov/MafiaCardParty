# GitHub Actions Workflows

This project includes automated CI/CD workflows to ensure code quality and test coverage.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)
Runs on every push and pull request to the `main` branch.

**Steps:**
- Checkout code
- Install dependencies using npm ci
- Run ESLint (code quality checks)
- Run unit tests with Vitest
- Build the project

**Matrix:** Tested on Node.js 18.x and 20.x

### 2. E2E Tests Workflow (`.github/workflows/e2e.yml`)
Runs end-to-end tests using Playwright on every push and pull request to `main`.

**Steps:**
- Checkout code
- Install dependencies
- Install Playwright browsers
- Run E2E tests
- Upload Playwright report as artifact

**Reports:** HTML test reports are saved and available as artifacts

### 3. Test Coverage Workflow (`.github/workflows/coverage.yml`)
Generates and reports unit test coverage metrics.

**Steps:**
- Checkout code
- Install dependencies
- Generate coverage reports with Vitest
- Upload coverage to Codecov

### 4. Deploy to GitHub Pages Workflow (`.github/workflows/deploy.yml`)
Manual deployment workflow triggered by user action in GitHub Actions.

**Steps:**
- Checkout code
- Install dependencies
- Build the project
- Upload build artifact to GitHub Pages
- Deploy to GitHub Pages

**How to Use:**
1. Go to the GitHub repository
2. Click on the "Actions" tab
3. Select "Deploy to GitHub Pages" workflow
4. Click "Run workflow" button
5. Confirm the execution

## Important Notes

You'll need to enable GitHub Pages in your repository settings:
1. Go to Settings → Pages
2. Under "Build and deployment", select **"GitHub Actions"** as the source
3. **(Optional)** If your site isn't at the root of your GitHub Pages URL, add a `base` property to `vite.config.ts` (e.g., for `username.github.io/MafiaCardParty`, set `base: '/MafiaCardParty/'`)

## Required Secrets

No secrets are required for these workflows to run.

## Badge

You can add a badge to your README to show CI status:

```markdown
![CI](https://github.com/SanyoGorbunov/MafiaCardParty/actions/workflows/ci.yml/badge.svg)
```

## Local Testing

Before pushing, you can run these checks locally:

```bash
# Lint
npm run lint

# Unit tests
npm run test

# E2E tests (requires dev server)
npm run test:e2e

# Coverage
npm run test:coverage

# Build
npm run build
```
