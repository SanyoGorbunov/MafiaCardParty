# Test Files Directory

This directory contains test setup and utilities for the project.

## Setup Files

- `setup.ts` - Global test setup that runs before all tests. Configures:
  - Testing Library cleanup after each test
  - window.matchMedia mock for responsive design tests
  - jest-dom matchers

## Running Tests

- `npm run test` - Run all tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI interface
- `npm run test:coverage` - Generate coverage reports
