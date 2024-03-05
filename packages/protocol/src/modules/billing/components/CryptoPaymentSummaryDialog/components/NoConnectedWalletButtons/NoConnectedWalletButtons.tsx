import { t } from '@ankr.com/common';

import { PrimaryButton } from '../PrimaryButton';
import { SecondaryButton } from '../SecondaryButton';
import { useNoConnectedWalletButtonsStyles } from './useNoConnectedWalletButtonsStyles';

export interface INoConnectedWalletButtonProps {
  onCancelButtonClick: () => void;
  onConnectButtonClick: () => void;
}

export const NoConnectedWalletButtons = ({
  onCancelButtonClick,
  onConnectButtonClick,
}: INoConnectedWalletButtonProps) => {
  const { classes } = useNoConnectedWalletButtonsStyles();

  return (
    <div className={classes.root}>
      <PrimaryButton onClick={onConnectButtonClick}>
        {t('account.payment-summary-dialog.crypto.connect-button')}
      </PrimaryButton>
      <SecondaryButton onClick={onCancelButtonClick}>
        {t('account.payment-summary-dialog.cancel-button')}
      </SecondaryButton>
    </div>
  );
};
