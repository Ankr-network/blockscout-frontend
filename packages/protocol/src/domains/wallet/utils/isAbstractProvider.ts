import { AbstractProvider, provider as Web3Provider } from 'web3-core';

export const isAbstractProvider = (
  provider: Web3Provider,
): provider is AbstractProvider =>
  provider !== null && typeof provider === 'object' && 'request' in provider;
