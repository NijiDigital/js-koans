[![Workflow Status](https://github.com/openhoat/js-koans-solutions/actions/workflows/main.yml/badge.svg)](https://github.com/openhoat/js-koans-solutions/actions)

# JavaScript Koans

The goal of this project is to improve skills of JavaScript programmers.

It mainly contains tests with problems to solve and assertions to check requirements of the component to implement.

The way it works is very simple, all you have to do is to solve the failing tests, step by step.

## Story

### Before you solved :

<img src="./assets/js-koans-test-fail.gif" alt="Test FAIL" width="600">

### After you solved :

<img src="./assets/js-koans-test-pass.gif" alt="Test PASS" width="600">

## Usage

### Prerequisite

- Install NodeJS version >= 14.15
- Install NPM version >= 7
- Install project dependencies :

  ```shell
  $ npm i
  ```

### Play with tests

Methodology : 

1. Run the test to see the error message
    ```shell
    $ npm run play
    ```
2. Watch the test source file to understand how to fulfill tests requirements
3. Change the component source
4. Run the test again and loop to (3) until it passes

The "play" npm script will execute tests and report koans results.
By default, tests are executed from lower difficulty level to higher.

Other scripts:

- build : transpile the sources from ./src to ./built directory
- clean : clean the ./built and ./dist directories
- lint : run linter
- play : run the tests with a custom reporter that displays koans score
- prettier : check sources format
- test : run the tests with default reporter
- test:watch : run the tests in watch mode
- validate : validate the main sources with linter and tests

### Submit your code

- Fork this repo
- Visit the "Actions" tab in your fork and enable workflows

All the exercises are located in src/test folder and have a '.test' name suffix (ex: sum.test.js).

You should place the solutions sources of exercises into src/main folder, with the same basename as the test file (ex: sum.js).

To publish your changes to your repo, type:

  ```shell
  $ git add .
  $ git commit -m "solutions to exercises"
  $ git push origin master
  ```

And then, eventually ask for a review (please do not create a pull request on this repo).

## More information

- Jest is used to implement and run the tests with a custom runner and a custom reporter.
- Babel is used seamlessly to support es2020
- Solutions are not part of this project, but in another private one

## Tips and tricks

### Execute a subset of tests

The test sources have group tags decorations, so you can execute tests that match a specific tag.

Examples:

- execute tests of difficulty level 1 and tests with tag "async"

  ```shell
  $ npm run play -- --level=2 --tags=async
  ```

- execute only the "factorial" test

  ```shell
  $ npm run play -- -t="factorial"
  ```

- execute tests and stop on first failure

  ```shell
  $ npm run play -- -b
  ```

Enjoy!
