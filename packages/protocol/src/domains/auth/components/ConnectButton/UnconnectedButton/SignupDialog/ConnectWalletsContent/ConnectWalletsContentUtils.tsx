import { isMobile } from 'web3modal';
import { EWalletId, Web3KeyReadProvider } from '@ankr.com/provider';

import { ReactComponent as HuobiWalletIcon } from './assets/huobi-wallet-icon.svg';
import { ReactComponent as ImTokenWalletIcon } from './assets/imtoken-wallet-icon.svg';
import { ReactComponent as MathWalletIcon } from './assets/math-wallet-icon.svg';
import { ReactComponent as MetaMaskIcon } from './assets/metamask-icon.svg';
import { ReactComponent as TrustWalletIcon } from './assets/trust-wallet-icon.svg';
import { ReactComponent as WalletConnectIcon } from './assets/wallet-connect-icon.svg';
import { IWalletItem } from './ConnectWalletsContentTypes';

export const ETH_COMPATIBLE_WALLETS: IWalletItem[][] = [
  [
    {
      href: 'https://metamask.io/download/',
      icon: <MetaMaskIcon />,
      isHidden: isMobile(),
      get isInjected() {
        return Web3KeyReadProvider.isInjected();
      },
      title: 'MetaMask',
      walletId: EWalletId.injected,
    },
    {
      href: '',
      icon: <WalletConnectIcon />,
      isHidden: false,
      isInjected: true,
      title: 'WalletConnect',
      walletId: EWalletId.walletconnect,
    },
    {
      href: '',
      icon: <ImTokenWalletIcon />,
      isHidden: false,
      isInjected: true,
      title: 'imToken',
      walletId: EWalletId.imtoken,
    },
  ],
  [
    {
      href: '',
      icon: <MathWalletIcon />,
      isHidden: false,
      isInjected: true,
      title: 'Math Wallet',
      walletId: EWalletId.math,
    },
    {
      href: '',
      icon: <TrustWalletIcon />,
      isHidden: false,
      isInjected: true,
      title: 'Trust Wallet',
      walletId: EWalletId.trustViaWalletConnect,
    },
    {
      href: '',
      icon: <HuobiWalletIcon />,
      isHidden: false,
      isInjected: true,
      title: 'Huobi Wallet',
      walletId: EWalletId.huobi,
    },
  ],
];
