# Playwright + TypeScript Test Automation Framework

[![Playwright Tests](https://github.com/lebrodus/playwright-typescript-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/lebrodus/playwright-typescript-framework/actions/workflows/playwright.yml)
[![Allure Report](https://img.shields.io/badge/Allure-Live%20Report-FF4081?logo=qameta&logoColor=white)](https://lebrodus.github.io/playwright-typescript-framework/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.49-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)

📊 **[View the live Allure report →](https://lebrodus.github.io/playwright-typescript-framework/)** (published from CI on every push to `main`)

A production-style end-to-end, API and web test automation framework built with **Playwright** and **TypeScript**. It demonstrates the patterns I use day to day as an SDET: the **Page Object Model**, **custom fixtures**, strongly typed test data, cross-browser execution, and a **CI pipeline** on GitHub Actions.

> All suites run against stable public targets (Playwright TodoMVC, the Playwright docs site, and JSONPlaceholder), so the project is clone-and-run with no secrets or setup.

## Highlights

- **Page Object Model** with a shared `BasePage` and typed, intention-revealing methods.
- **Custom fixtures** that inject ready-to-use page objects, keeping specs declarative.
- **Four layers of coverage**: UI end-to-end, web-UI smoke, REST API (no browser), and **visual regression**.
- **Visual regression** with Playwright's native snapshot comparison (element-level baselines, tolerance + disabled animations).
- **Cross-browser + mobile**: Chromium, Firefox, WebKit and an emulated mobile project.
- **CI/CD**: GitHub Actions matrix across all browsers, with reports as build artifacts.
- **Allure reporting**: rich, history-aware test reports alongside the built-in HTML report.
- **Robust by default**: auto-waiting locators, retries on CI, trace/screenshot/video on failure.
- **Strict TypeScript**: `strict`, no unused locals/params, path aliases.

## Tech Stack

`Playwright` · `TypeScript` · `Node.js` · `GitHub Actions` · `REST API testing` · `Visual Regression` · `Allure` · `Page Object Model`

## Project Structure

```
playwright-typescript-framework/
├─ src/
│  ├─ pages/         # Page Objects (BasePage, TodoPage)
│  ├─ fixtures/      # Custom Playwright fixtures
│  └─ data/          # Reusable, typed test data
├─ tests/
│  ├─ e2e/           # End-to-end UI flows (TodoMVC)
│  ├─ web/           # Web-UI smoke tests (playwright.dev)
│  ├─ api/           # REST API tests (JSONPlaceholder)
│  └─ visual/        # Visual regression (snapshot baselines)
├─ .github/workflows/playwright.yml
├─ playwright.config.ts
└─ tsconfig.json
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Install browsers
npx playwright install

# 3. Run the whole suite
npm test
```

### Useful scripts

| Command | Description |
|---|---|
| `npm test` | Run all tests, all browsers |
| `npm run test:e2e` | UI end-to-end suite only |
| `npm run test:api` | REST API suite only |
| `npm run test:web` | Web-UI smoke suite only |
| `npm run test:visual` | Visual regression suite (compare to baselines) |
| `npm run test:visual:update` | Regenerate visual baselines |
| `npm run test:chromium` | Run on Chromium only |
| `npm run test:ui` | Open the Playwright UI mode |
| `npm run report` | Open the last HTML report |
| `npm run allure:serve` | Build & open the Allure report (one step) |
| `npm run allure:generate` | Generate the static Allure report to `allure-report/` |
| `npm run lint` | Type-check with `tsc --noEmit` |

## Reporting

Every run produces three reports:

- **Playwright HTML** - `npm run report`
- **JSON** - `test-results/results.json` (for custom dashboards / CI parsing)
- **Allure (live)** - published to GitHub Pages by CI on every push to `main`, with trend history across runs: **https://lebrodus.github.io/playwright-typescript-framework/**
- **Allure (local)** - rich report with steps, attachments and trends:

```bash
npm test                 # produces allure-results/
npm run allure:serve     # builds and opens the Allure report
```

> Allure report generation uses the Allure CLI, which requires **Java 8+** on the machine generating the report. Test execution itself needs no Java.

## Test Design Notes

- **Locators** prefer user-facing roles and test IDs (`getByRole`, `getByTestId`) over brittle CSS/XPath.
- **Assertions** use Playwright's web-first `expect`, which auto-retries and removes flaky sleeps.
- **Data and pages are separated from specs** so tests read as behaviour, not setup.
- **API tests** validate status codes, response shape (contract) and a negative path.

## Author

**Lewis Babe Yaka** - QA Tech Lead & SDET
[LinkedIn](https://www.linkedin.com/in/lewis-babe-yaka)

## License

MIT
