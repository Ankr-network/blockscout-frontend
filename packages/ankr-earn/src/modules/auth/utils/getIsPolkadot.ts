const POLKADOT_WALLET_NAME = 'Polkadot';

export const getIsPolkadot = (walletName: string): boolean =>
  walletName === POLKADOT_WALLET_NAME;
