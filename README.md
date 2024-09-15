# Remix + Playwright

This example shows how to generate code coverage for [Remix](https://remix.run/) with Playwright

## Generate Coverage Report
```sh
npm i
npm run test

[MCR] Remix V8 Coverage Report
┌────────────────────┬──────────┬────────────┬──────────┬───────────┬──────────┬─────────────────────┐
│ Name               │    Bytes │ Statements │ Branches │ Functions │    Lines │ Uncovered Lines     │
├────────────────────┼──────────┼────────────┼──────────┼───────────┼──────────┼─────────────────────┤
│ app                │          │            │          │           │          │                     │
│ ├ entry.client.tsx │ 100.00 % │   100.00 % │          │  100.00 % │ 100.00 % │                     │
│ ├ entry.server.tsx │  50.79 % │    44.83 % │  37.50 % │   36.36 % │  49.55 % │ 28-32,41-89,122-133 │
│ ├ root.tsx         │ 100.00 % │   100.00 % │          │  100.00 % │ 100.00 % │                     │
│ └ routes           │          │            │          │           │          │                     │
│   ├ _index.tsx     │ 100.00 % │   100.00 % │          │  100.00 % │ 100.00 % │                     │
│   └ test.tsx       │  72.29 % │    63.64 % │  75.00 % │   50.00 % │  56.00 % │ 5-9,22-27           │
├────────────────────┼──────────┼────────────┼──────────┼───────────┼──────────┼─────────────────────┤
│ Summary            │  82.61 % │    62.26 % │  50.00 % │   60.00 % │  79.76 % │                     │
└────────────────────┴──────────┴────────────┴──────────┴───────────┴──────────┴─────────────────────┘
```
HTML coverage report will be found here: `monocart-report/coverage/index.html`

## Tips
- build with `remix vite:build --minify=false --sourcemapClient=true --sourcemapServer=true`
- start server with `cross-env NODE_V8_COVERAGE=.v8-coverage NODE_OPTIONS=--inspect=9229 remix-serve ./build/server/index.js`
- take client side coverage with [e2e/fixture.ts](e2e/fixture.ts)
- take server side coverage manually with CDP, see [e2e/global-teardown.ts](e2e/global-teardown.ts)