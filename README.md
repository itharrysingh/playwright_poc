# Ezra Playwright POC

This is a Playwright proof of concept to automate core Ezra user flows:
- authentication (valid/invalid users)
- scan selection (MRI, MRI with Spine, CT)
- scheduling
- booking & payment confirmation
- basic authorization checks (second user shouldn’t see first user’s booking)

## 1. Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+  
- Chrome/Chromium available locally (Playwright will install its own browsers)

## 2. Setup and Execution

Clone the repo locally and run "npm install" and then "npx playwright install" from root directory

To execute all tests run "npx playwright test"

To execute against a specified browser run "npx playwright test --project=chromium" - in this case it will be chrome. See below for other options:

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

To execute a specific test run "npx playwright test ./tests/authentication.spec.js --headed --reporter=html --project=chromium". This will execute data driven login tests, with all 3 browsers and the interactions displayed to user concluding with html reporter.

If you run into any execution issues, be sure to run "npx playwright install" 

