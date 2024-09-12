import { APIError } from "./error";

export const fetchAndParse = async <T = void>(
  ...args: Parameters<typeof fetch>
): Promise<T> => {
  const response = await fetch(...args);
  if (!response.ok) {
    // try and parse the error response
    const parsed = await response.json();
    throw new APIError(response, parsed.message);
  }

  try {
    return await response.json();
  } catch {
    throw new APIError(response, "Parse failure");
  }
};
