import axios from "axios";

/**
 * Normalizes an unknown thrown value (axios error, Error, anything) into a
 * message that is safe to show in a toast or an inline alert.
 */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;

    return data?.message ?? error.message ?? fallback;
  }

  if (error instanceof Error && error.message) return error.message;

  return fallback;
}