import { useEffect, useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';

import { ISwitchAccountDialogProps } from '../SwitchAccountDialog';
import { useConnectedAddress } from './useConnectedAccount';
import { useSwitchButtonClickHandler } from './useSwitchButtonClickHandler';

export const useSwitchAccountDialog = () => {
  const { connectedAddress } = useConnectedAddress();

  const { address: authAddress, walletMeta } = useAuth();

  const {
    isOpened: open,
    onOpen: handleOpenSwitchAccountDialog,
    onClose: handleCloseSwitchAccountDialog,
  } = useDialog();

  const walletIcon = walletMeta?.icon;

  const { isSwitching, onSwitchButtonClick } = useSwitchButtonClickHandler();

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
    if (connectedAddress.toLowerCase() !== authAddress.toLowerCase()) {
      handleOpenSwitchAccountDialog();
    } else {
      handleCloseSwitchAccountDialog();
    }
  }, [
    authAddress,
    connectedAddress,
    handleCloseSwitchAccountDialog,
    handleOpenSwitchAccountDialog,
  ]);

  return { handleOpenSwitchAccountDialog, switchAccountDialogProps };
};
