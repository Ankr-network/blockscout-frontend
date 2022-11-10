import binanceWalletLogo from './assets/binance-wallet.svg';
import coin98WalletLogo from './assets/coin98-wallet.svg';
import coinbaseLogo from './assets/coinbase.svg';
import huobiLogo from './assets/huobi.svg';
import imTokenLogo from './assets/im-token.svg';
import mathLogo from './assets/math.svg';
import metamaskLogo from './assets/metamask.svg';
import okxLogo from './assets/okx.svg';
import trustWalletLogo from './assets/trust.svg';
import walletConnectLogo from './assets/wallet-connect.svg';
import { EWalletId } from './types';

export const getWalletIcon = (walletId: EWalletId): string => {
  switch (walletId) {
    case EWalletId.binanceWallet:
      return binanceWalletLogo;
    case EWalletId.imtoken:
      return imTokenLogo;
    case EWalletId.math:
      return mathLogo;
    case EWalletId.trustViaWalletConnect:
    case EWalletId.trust:
      return trustWalletLogo;
    case EWalletId.huobi:
      return huobiLogo;
    case EWalletId.walletconnect:
      return walletConnectLogo;
    case EWalletId.okxwallet:
      return okxLogo;
    case EWalletId.coinbase:
      return coinbaseLogo;
    case EWalletId.coin98:
      return coin98WalletLogo;
    case EWalletId.injected:
    default:
      return metamaskLogo;
  }
};
