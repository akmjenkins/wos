export class APIError extends Error {
  constructor(public response: Response, message?: string) {
    super(message || `APIError: ${response.status}`);
  }
}
