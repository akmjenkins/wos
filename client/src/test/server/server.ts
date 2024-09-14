import { setupServer } from "msw/node";

export const createTestServer = (...args: Parameters<typeof setupServer>) => {
  const server = setupServer(...args);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
};
