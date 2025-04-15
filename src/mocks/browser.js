import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// for browser environments
export const worker = setupWorker(...handlers);
