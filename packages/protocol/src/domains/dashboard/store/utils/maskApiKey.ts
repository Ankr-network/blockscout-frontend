/**
 * mask api_key to match (mon*****2vu)
 * make visible only first 3 and last 3 characters. inside content should be masked to 5 characters *
 * example: mon*****2vu
 * */

export function maskApiKey(apiKey: string): string {
  return `${apiKey.slice(0, 3)}*****${apiKey.slice(-3)}`;
}
