import { EWalletId } from '../types';
import huobiLogo from '../providers/EthereumWeb3KeyProvider/assets/huobi.svg';
import imTokenLogo from '../providers/EthereumWeb3KeyProvider/assets/im-token.svg';
import binanceWalletLogo from '../providers/EthereumWeb3KeyProvider/assets/binance-wallet.svg';
import mathLogo from '../providers/EthereumWeb3KeyProvider/assets/math.svg';
import trustWalletLogo from '../providers/EthereumWeb3KeyProvider/assets/trust.svg';
import okxLogo from '../providers/EthereumWeb3KeyProvider/assets/okx.svg';
import walletConnectLogo from '../providers/EthereumWeb3KeyProvider/assets/wallet-connect.svg';
import metamaskLogo from '../providers/EthereumWeb3KeyProvider/assets/metamask.svg';

export const getWalletIcon = (walletId: EWalletId): string => {
  switch (walletId) {
    case EWalletId.binanceWallet:
      return binanceWalletLogo;
    case EWalletId.imtoken:
      return imTokenLogo;
    case EWalletId.math:
      return mathLogo;
    case EWalletId.trust:
      return trustWalletLogo;
    case EWalletId.huobi:
      return huobiLogo;
    case EWalletId.walletconnect:
      return walletConnectLogo;
    case EWalletId.okxwallet:
      return okxLogo;
    case EWalletId.injected:
    default:
      return metamaskLogo;
  }
};
