[![Build Status](https://app.travis-ci.com/openhoat/js-koans-solutions.svg?token=Epg1qqwcpkp2akpnm3QK&branch=solutions)](https://app.travis-ci.com/openhoat/js-koans-solutions)

# JavaScript Koans

The goal of this project is to improve skills of JavaScript programmers.

It mainly contains some tests that describe some problems to solve and make assertions to check if the component behaves correctly.

The way it works is very simple, all you have to do is to solve the failing tests.

## Story

### Before you solved :

<img src="./assets/js-koans-test-fail.gif" alt="Test FAIL" width="600">

### After you solved :

<img src="./assets/js-koans-test-pass.gif" alt="Test PASS" width="600">

## Usage

### Prerequisite

```shell
$ npm i
```

### Play with tests

Validate linting and tests:

```shell
$ npm run validate
```

Or simply execute tests:

```shell
$ npm test
```

By default, tests are executed through an ordered sequence specified in [test-sequence.json](https://raw.githubusercontent.com/openhoat/js-koans/master/test-sequence.json).

Other scripts:

- build : transpile the sources from ./src to ./built directory
- clean : clean the ./built and ./dist directories
- lint : run linter
- prettier : check sources format
- test : run the tests
- test:watch : run the tests in watch mode
- validate : validate the main sources with linter and tests

## More information

- Jest is used to implement and run the tests.
- Babel is used seamlessly to support es2020
- Solutions are not part of this project, but in another private one

## Tips and tricks

### Execute a subset of tests

The test sources have group tags decorations, so you can execute tests that match a specific tag.

Examples:

- execute tests of group "easy" and tests of group "sync"

  ```shell
  $ npm test -- --group=easy --group=sync
  ```

- execute only the "factorial" test

  ```shell
  $ npm test -- --group=sync -t="factorial"
  ```

- execute only the "supereasy" tests, showing each test usecase

  ```shell
  $ npm test -- --group=supereasy --verbose
  ```

Enjoy!
