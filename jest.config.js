/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
