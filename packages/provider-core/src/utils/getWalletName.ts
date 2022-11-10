import { EWalletId } from './types';

export const getWalletName = (id: EWalletId): string => {
  switch (id) {
    case EWalletId.okxwallet:
      return 'OKX Wallet';
    case EWalletId.coinbase:
      return 'Coinbase Wallet';
    case EWalletId.huobi:
      return 'Huobi Wallet';
    case EWalletId.trustViaWalletConnect:
    case EWalletId.trust:
      return 'Trust Wallet';
    case EWalletId.math:
      return 'Math Wallet';
    case EWalletId.imtoken:
      return 'imToken';
    case EWalletId.binanceWallet:
      return 'Binance Wallet';
    case EWalletId.walletconnect:
      return 'WalletConnect';
    case EWalletId.coin98:
      return 'Coin98 Wallet';
    case EWalletId.injected:
      return 'MetaMask';
    default:
      return 'web3 wallet';
  }
};
