import { LoadingButton } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { Web3Address } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { WalletAddressBox } from 'modules/common/components/WalletAddressBox';

import { useSwitchAccountDialogStyles } from './useSwitchAccountDialogStyles';

export interface ISwitchAccountDialogProps extends IDialogProps {
  address: Web3Address;
  isSwitching?: boolean;
  onSwitchButtonClick: () => void;
  walletIcon?: string;
}

export const SwitchAccountDialog = ({
  address,
  isSwitching,
  onSwitchButtonClick,
  walletIcon,
  ...dialogProps
}: ISwitchAccountDialogProps) => {
  const { classes } = useSwitchAccountDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      canCloseDialogByClickOutside={false}
      classes={classes}
      shouldHideCloseButton
      title={t('account.switch-account-dialog.title')}
    >
      <Typography
        className={classes.description}
        component="div"
        variant="body2"
      >
        {t('account.switch-account-dialog.description')}
      </Typography>
      <WalletAddressBox
        className={classes.walletAddress}
        address={address}
        walletIcon={walletIcon}
      />
      <LoadingButton
        fullWidth
        loading={isSwitching}
        onClick={onSwitchButtonClick}
        size="large"
      >
        {t('account.switch-account-dialog.switch-button')}
      </LoadingButton>
    </Dialog>
  );
};
