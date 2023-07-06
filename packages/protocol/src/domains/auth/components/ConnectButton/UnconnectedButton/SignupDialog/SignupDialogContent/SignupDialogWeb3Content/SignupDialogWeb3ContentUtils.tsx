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
import { t } from '@ankr.com/common';

import { IWalletItem } from './SignupDialogWeb3ContentTypes';

const getTooltipMessage = () => t('signup-modal.web3.tooltip-message');

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
      isFirstConnectWallet: true,
      icon: <WalletConnect />,
      isHidden: false,
      isInjected: true,
      title: 'WalletConnect',
      walletId: EWalletId.walletconnect,
      isDisabled: true,
      getTooltipMessage,
    },
    {
      href: '',
      icon: <ImtokenWallet />,
      isHidden: false,
      isInjected: true,
      title: 'imToken',
      walletId: EWalletId.imtoken,
      isDisabled: true,
      getTooltipMessage,
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
      isDisabled: true,
      getTooltipMessage,
    },
    {
      href: '',
      icon: <TrustWallet />,
      isHidden: false,
      isInjected: true,
      title: 'Trust Wallet',
      walletId: EWalletId.trustViaWalletConnect,
      isDisabled: true,
      getTooltipMessage,
    },
    {
      href: '',
      icon: <HuobiWallet />,
      isHidden: false,
      isInjected: true,
      title: 'Huobi Wallet',
      walletId: EWalletId.huobi,
      isDisabled: true,
      getTooltipMessage,
    },
  ],
];
