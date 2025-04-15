import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './server';

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());

// import '@testing-library/jest-dom';
// import { server } from './mocks/server.js';

// // Establish API mocking before all tests.
// beforeAll(() => server.listen());
// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
// afterEach(() => server.resetHandlers());
// // Clean up after the tests are finished.
// afterAll(() => server.close());