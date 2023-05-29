import { isMobile } from 'web3modal';
import { EWalletId, Web3KeyReadProvider } from '@ankr.com/provider';
import {
  HuobiWallet,
  ImtokenWallet,
  MathWallet,
  MetaMaskWallet,
  TrustWallet,
  WalletConnect,
} from '@ankr.com/ui';
import { IWalletItem } from './SignupDialogWeb3ContentTypes';

export const ETH_COMPATIBLE_WALLETS: IWalletItem[][] = [
  [
    {
      href: 'https://metamask.io/download/',
      icon: <MetaMaskWallet />,
      isHidden: isMobile(),
      get isInjected() {
        return Web3KeyReadProvider.isInjected();
      },
      title: 'MetaMask',
      walletId: EWalletId.injected,
    },
    {
      href: '',
      icon: <WalletConnect />,
      isHidden: false,
      isInjected: true,
      title: 'WalletConnect',
      walletId: EWalletId.walletconnect,
    },
    {
      href: '',
      icon: <ImtokenWallet />,
      isHidden: false,
      isInjected: true,
      title: 'imToken',
      walletId: EWalletId.imtoken,
    },
  ],
  [
    {
      href: '',
      icon: <MathWallet />,
      isHidden: false,
      isInjected: true,
      title: 'Math Wallet',
      walletId: EWalletId.math,
    },
    {
      href: '',
      icon: <TrustWallet />,
      isHidden: false,
      isInjected: true,
      title: 'Trust Wallet',
      walletId: EWalletId.trustViaWalletConnect,
    },
    {
      href: '',
      icon: <HuobiWallet />,
      isHidden: false,
      isInjected: true,
      title: 'Huobi Wallet',
      walletId: EWalletId.huobi,
    },
  ],
];
