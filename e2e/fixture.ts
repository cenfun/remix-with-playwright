/**
 * Test fixture that collects v8 code coverage.
 * Adapted from: https://github.com/cenfun/nextjs-with-playwright/blob/544e2a498812d9c5965a3d28201b64f29f036353/e2e/fixtures.js
 */
import { test as baseTest, expect } from '@playwright/test';
import { addCoverageReport } from 'monocart-reporter';

interface AppFixtures {
  autoTestFixture: string;
}

/**
 * Test and collect v8 coverage
 * {@inheritDoc @playwright/test:test}
 */
const test = baseTest.extend<AppFixtures>({
    autoTestFixture: [
        async ({ page }, use): Promise<void> => {

            const isChromium = test.info().project.name === 'Desktop Chrome';

            // console.log('autoTestFixture setup...', test.info().project.name);
            // coverage API is chromium only
            if (isChromium) {
                await Promise.all([
                    page.coverage.startJSCoverage({
                        resetOnNavigation: false
                    }),
                    page.coverage.startCSSCoverage({
                        resetOnNavigation: false
                    })
                ]);
            }

            await use('autoTestFixture');

            // console.log('autoTestFixture teardown...');
            if (isChromium) {
                const [jsCoverage, cssCoverage] = await Promise.all([
                    page.coverage.stopJSCoverage(),
                    page.coverage.stopCSSCoverage()
                ]);
                const coverageList = [... jsCoverage, ... cssCoverage];
                // console.log(coverageList.map((item) => item.url));
                if (coverageList.length) {
                    await addCoverageReport(coverageList, test.info());
                }
            }

        },
        {
            scope: 'test',
            auto: true
        }
    ]
});

export { expect, test };
