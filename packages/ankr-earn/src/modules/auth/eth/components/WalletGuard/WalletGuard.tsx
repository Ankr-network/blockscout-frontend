import { EWalletId } from '@ankr.com/provider';

interface IWalletGuardProps {
  notSupportedWallets?: EWalletId[];
  currentWalletId?: string;
  supportSlot?: JSX.Element;
  children: JSX.Element;
}

export const WalletGuard = ({
  notSupportedWallets = [],
  currentWalletId,
  supportSlot,
  children,
}: IWalletGuardProps): JSX.Element => {
  const isNotSupportedWallet = currentWalletId
    ? notSupportedWallets.includes(currentWalletId as EWalletId)
    : false;

  if (isNotSupportedWallet && supportSlot) {
    return supportSlot;
  }

  return children;
};
