import { DEFAULT_WALLET_NAME } from 'polkadot';

export const getIsPolkadot = (walletName: string): boolean =>
  walletName === DEFAULT_WALLET_NAME;
