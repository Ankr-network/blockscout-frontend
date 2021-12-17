import { Dialog, IconButton } from '@material-ui/core';
import React from 'react';
import { CancelIcon } from 'uiKit/Icons/CancelIcon';
import { SelectWallet } from '../SelectWallet';
import { useSelectWalletModalStyles } from './useSelectWalletModalStyles';

export interface IPolkadotExtensionModal {
  isOpened: boolean;
  onClose: () => void;
  isCloverWalletAvailable: boolean;
  isPolkadotWalletAvailable: boolean;
  handleConnect: () => void;
}

export const SelectWalletModal = ({
  isOpened,
  onClose,
  isCloverWalletAvailable,
  isPolkadotWalletAvailable,
  handleConnect,
}: IPolkadotExtensionModal) => {
  const classes = useSelectWalletModalStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      scroll="body"
      fullWidth={true}
      PaperProps={{ square: false }}
      classes={{ paper: classes.root }}
    >
      <IconButton className={classes.close} onClick={onClose}>
        <CancelIcon size="xmd" />
      </IconButton>
      <SelectWallet
        isCloverWalletAvailable={isCloverWalletAvailable}
        isPolkadotWalletAvailable={isPolkadotWalletAvailable}
        handleConnect={handleConnect}
      />
    </Dialog>
  );
};
