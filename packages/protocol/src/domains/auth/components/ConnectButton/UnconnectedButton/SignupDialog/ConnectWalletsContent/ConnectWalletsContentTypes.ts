import { EWalletId } from '@ankr.com/provider';
import { ReactNode } from 'react';

export interface IConnectWalletsModalProps {
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
