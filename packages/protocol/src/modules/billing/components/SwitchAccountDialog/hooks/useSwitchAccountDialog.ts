import { useEffect, useMemo } from 'react';

import { selectHasProcessingTransaction } from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useConnectAccountHandler } from 'modules/billing/hooks/useConnectAccountHandler';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';
import { useDialog } from 'modules/common/hooks/useDialog';

import { ISwitchAccountDialogProps } from '../SwitchAccountDialog';

export const useSwitchAccountDialog = () => {
  const { connectedAddress: depositAddress } = useConnectedAddress();

  const { address: authAddress, walletMeta, hasWeb3Connection } = useAuth();

  const isDepositAddressDifferent =
    depositAddress?.toLowerCase() !== authAddress.toLowerCase();

  const hasProcessingTransaction = useAppSelector(state =>
    selectHasProcessingTransaction(state, depositAddress),
  );

  const shouldOpenDialog =
    hasWeb3Connection && !hasProcessingTransaction && isDepositAddressDifferent;

  const {
    isOpened: open,
    onOpen: handleOpenSwitchAccountDialog,
    onClose: handleCloseSwitchAccountDialog,
  } = useDialog();

  const walletIcon = walletMeta?.icon;

  const {
    handleConnectAccount: onSwitchButtonClick,
    isConnecting: isSwitching,
  } = useConnectAccountHandler();

  const switchAccountDialogProps = useMemo<ISwitchAccountDialogProps>(
    () => ({
      address: authAddress,
      isSwitching,
      onClose: handleCloseSwitchAccountDialog,
      onSwitchButtonClick,
      open,
      walletIcon,
    }),
    [
      authAddress,
      handleCloseSwitchAccountDialog,
      isSwitching,
      onSwitchButtonClick,
      open,
      walletIcon,
    ],
  );

  useEffect(() => {
    if (shouldOpenDialog) {
      handleOpenSwitchAccountDialog();
    } else {
      handleCloseSwitchAccountDialog();
    }
  }, [
    handleCloseSwitchAccountDialog,
    handleOpenSwitchAccountDialog,
    shouldOpenDialog,
  ]);

  return { handleOpenSwitchAccountDialog, switchAccountDialogProps };
};
