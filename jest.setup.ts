import '@testing-library/jest-dom';

import { setupServer } from 'msw/node';
import { handlers } from './__mocks__/handlers';

export const server = setupServer(...handlers);

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

beforeAll(() => {
  // msw 서버구동
  server.listen();
});

afterEach(() => {
  jest.clearAllMocks();
  server.resetHandlers();
});

afterAll(() => {
  jest.resetAllMocks();
  // msw 서버 종료
  server.close();
});

jest.mock('zustand');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
