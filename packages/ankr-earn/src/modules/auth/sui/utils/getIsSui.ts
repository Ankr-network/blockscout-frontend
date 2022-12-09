import { DEFAULT_WALLET_NAME } from 'sui';

export const getIsSui = (walletName: string): boolean =>
  walletName === DEFAULT_WALLET_NAME;
