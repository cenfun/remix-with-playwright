
import fs from 'fs';
import { CDPClient } from 'monocart-coverage-reports';
import { addCoverageReport } from 'monocart-reporter';
import path from 'path';
import { PlaywrightTestConfig, TestInfo } from 'playwright/test';
import { fileURLToPath } from 'url';

export default async (config: PlaywrightTestConfig) => {

    const client = await CDPClient({
        port: 9229
    });

    if (!client) {
        console.log('Failed to connect to the server port 9229');
        return;
    }

    const dir = await client.writeCoverage();
    // @ts-expect-error: missing type definition
    await client.close();

    if (!fs.existsSync(dir)) {
        console.log('NODE_V8_COVERAGE directory does not exist', dir);
        return;
    }

    const files = fs.readdirSync(dir);
    for (const filename of files) {
        const content = fs.readFileSync(path.resolve(dir, filename)).toString('utf-8');
        const json = JSON.parse(content);

        let coverageList: Array<{ url: string; source: string }> = json.result;

        coverageList = coverageList.filter((entry) => entry.url && !entry.url.includes('node_modules'));
        coverageList = coverageList.filter((entry) => !entry.url.startsWith('node:'));
        coverageList = coverageList.filter((entry) => entry.url.includes('build/server'));

        if (!coverageList.length) {
            continue;
        }

        // attach source content
        coverageList.forEach((entry) => {
            const filePath = fileURLToPath(entry.url);
            if (fs.existsSync(filePath)) {
                entry.source = fs.readFileSync(filePath).toString('utf8');
            } else {
                console.log('could not locate source content for entry', filePath);
            }
        });

        const mockTestInfo = {
            config
        } as TestInfo;
        await addCoverageReport(coverageList, mockTestInfo);
    }
};
