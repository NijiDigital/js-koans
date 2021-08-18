const { join, resolve } = require('path')

const baseDir = __dirname

module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['.test.js'],
  coverageReporters: ['text', 'lcov', 'html'],
  globalSetup: join(baseDir, 'jest-global-setup.js'),
  moduleFileExtensions: ['js', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  rootDir: baseDir,
  runner: 'groups',
  setupFilesAfterEnv: [resolve(baseDir, 'src/jest-custom.js')],
  testEnvironment: 'node',
  testMatch: [join(baseDir, 'src/**/*.test.js')],
  verbose: false,
}
