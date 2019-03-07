# Front-end demo

## Getting started

- Make sure you have fulfilled the [prerequisites](#prerequisites).
- Run `yarn install` to set up Git hooks and install all JavaScript dependencies.

## Development workflow

- While developing, you can run a local server using `yarn start`.
  This will start a server on http://localhost:9090.
- To create a static HTML5 app build, run `yarn build`.
  The app will be built into the `dist/` directory.
- To run all unit tests once, run `yarn test:unit`.
- To run all unit tests continuously, run `yarn test:watch`.
- To run integration tests, run `yarn test:e2e`.
- To run all tests, run `yarn test`.
- To see how the dependencies affect bundle sizes, run `yarn analyze-bundle`.

## Linting

Code is linted with [ESLint](https://eslint.org/), [TSLint](https://palantir.github.io/tslint/), and [stylelint](https://stylelint.io/).
Running `yarn install` will install a Git commit hook that will lint your code before each commit.
You can run both linters manually using `yarn lint`.

## Prerequisites

### General

- Node.js >= 11 + Yarn, for the build system
- Chrome v59.x or higher to run the tests headless
- Java 8 (or higher) to run the end-to-end tests (it powers the selenium server)
