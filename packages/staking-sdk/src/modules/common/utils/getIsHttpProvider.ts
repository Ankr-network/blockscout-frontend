import { HttpProvider } from 'web3-core';

/**
 * Check if provider is HttpProvider.
 */
export const getIsHttpProvider = (
  provider: unknown,
): provider is HttpProvider => {
  return !!(provider as HttpProvider).host;
};
