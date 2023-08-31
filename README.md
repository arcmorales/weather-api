# Weather API Test in Playwright

This repository is an API Test in NodeJS and TypeScript using [Playwright](https://playwright.dev/)

## Installation

1. Clone this repository.
2. Ensure your machine has nodeJS and npm installed. This was tested with node version v18.17.1 and npm version 9.6.7
3. Run `npm install` to install all packages

## Run Tests

### Pre-requisites

Create a `.env` file in the project root folder (same level as package.json) to contain the api key. See `env.
sample` for the format

### Tests

**All test cases**

To run all the test cases:

```
npm test
```

**Individual test case**

For AC2:

```
npm test -- -g @AC2
```

For AC3:

```
npm test -- -g @AC3
```

### Generating Reports

**In List format**

The test would output a test result summary in list format as such:

```> weatherbit-api-test@1.0.0 test
> npx playwright test


Running 2 tests using 2 workers

  ✓  1 weatherbit.spec.ts:35:7 › Get Weather Data › @AC3: As a frequent flyer, I want to programmatically find the current warmest capital city in Australia (1.7s)
  ✓  2 weatherbit.spec.ts:9:7 › Get Weather Data › @AC2: As a frequent flyer, I want to get current weather data for the city at Latitude: -33.865143, Longitude: 151.209900 (1.6s)
The warmest capital city in Australia is Darwin with an apparent temperature of 26.3 degrees
While the coldest capital city in Australia is Canberra with an apparent temperature of 8.3 degrees

```

**In HTML format**

To open the HTML report, run `npx playwright show-report` and this will launch a browser

**On Test Failure:**

When any of the test cases fail, it would also automatically launch the HTML reporter and provide **traces** of the
failure for better understanding of the error.

## Contributing

This repo has **linting** `(eslint)` and **code formatting** `(prettier)` rules to ensure code standards are enforced.
A pre-commit hook will run and execute these checks and would throw code warnings or errors.
