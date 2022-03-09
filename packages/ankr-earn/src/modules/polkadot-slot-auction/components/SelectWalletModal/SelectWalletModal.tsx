import { Dialog, IconButton } from '@material-ui/core';

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
}: IPolkadotExtensionModal): JSX.Element => {
  const classes = useSelectWalletModalStyles();

  return (
    <Dialog
      fullWidth
      classes={{ paper: classes.root }}
      open={isOpened}
      PaperProps={{ square: false }}
      scroll="body"
      onClose={onClose}
    >
      <IconButton className={classes.close} onClick={onClose}>
        <CancelIcon size="md" />
      </IconButton>

      <SelectWallet
        handleConnect={handleConnect}
        isCloverWalletAvailable={isCloverWalletAvailable}
        isPolkadotWalletAvailable={isPolkadotWalletAvailable}
      />
    </Dialog>
  );
};
