import { EWalletId } from '@ankr.com/provider-core';
import { ReactNode } from 'react';

export interface IConnectWalletsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string) => void;
}

export interface IOnWalletItemClickArgs {
  href: string;
  isInjected: boolean;
  walletId: EWalletId | string;
}

export interface IWalletItem extends IOnWalletItemClickArgs {
  icon: ReactNode;
  isHidden: boolean;
  title: string;
}
