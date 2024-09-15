import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import { CoverageReportOptions } from 'monocart-reporter';

const removeLocalhostPrefix = (p:string) => {
    const prefix = 'localhost-5173/';
    if (p.startsWith(prefix)) {
        return p.slice(prefix.length);
    }
    return p;
};

const coverageReportOptions: CoverageReportOptions = {
    // logging: 'debug',
    name: 'Remix V8 Coverage Report',

    entryFilter: {

        '**/node_modules/**': false,
        '**/*.css': false,
        '**/manifest*': false,

        // for client side entries: http://localhost:3000/app/*
        '**/assets/**': true,

        // for server side
        '**/build/server/**': true
    },

    sourceFilter: {
        // for sources from sourcemap
        '**/node_modules/**': false,
        '**/*': true
    },

    sourcePath: (filePath, info) => {
        if (!filePath.includes('/') && info.distFile) {
            return removeLocalhostPrefix(`${path.dirname(info.distFile)}/${filePath}`);
        }
        return removeLocalhostPrefix(filePath);
    },

    reports: ['v8', 'console-details']
};

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
    // Timeout per test
    timeout: 30 * 1000,
    // Test directory
    testDir: './e2e',
    // If a test fails, retry it additional 2 times
    retries: 1,
    // Artifacts folder where screenshots, videos, and traces are stored.
    outputDir: 'test-results/',

    // Run your local dev server before starting the tests:
    // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
    webServer: {
        command: 'npm run test:command',
        url: baseURL,
        timeout: 120 * 1000,
        stdout: 'pipe',
        stderr: 'pipe',
        reuseExistingServer: !process.env.CI
    },

    globalTeardown: './e2e/global-teardown.ts',

    reporter: [
        ['list'],
        ['monocart-reporter', {

            coverage: coverageReportOptions

        }]
    ],

    use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
        baseURL,

        // Retry a test if its failing with enabled tracing. This allows you to analyze the DOM, console logs, network traffic etc.
        // More information: https://playwright.dev/docs/trace-viewer
        trace: 'retry-with-trace'

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    // contextOptions: {
    //   ignoreHTTPSErrors: true,
    // },
    },

    projects: [
        {
            name: 'Desktop Chrome',
            use: {
                ... devices['Desktop Chrome']
            }
        }
    ]
});
