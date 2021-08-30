const { join, resolve } = require('path')

const baseDir = __dirname

module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['.test.js'],
  coverageReporters: ['text', 'lcov', 'html'],
  globalSetup: join(baseDir, 'internal/jest/jest-global-setup.js'),
  moduleFileExtensions: ['js', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  reporters: ['<rootDir>/internal/jest/koans-reporter.js'],
  rootDir: baseDir,
  runner: '<rootDir>/internal/jest/koans-runner',
  setupFilesAfterEnv: [resolve(baseDir, 'src/test/jest-custom.js')],
  testEnvironment: 'node',
  testMatch: [join(baseDir, 'src/**/*.test.js')],
  testSequencer: join(baseDir, 'internal/jest/test-sequencer.js'),
}
