import { t } from '@ankr.com/common';

import { PrimaryButton } from 'modules/payments/components/PrimaryButton';
import { SecondaryButton } from 'modules/payments/components/SecondaryButton';

import { useNoConnectedWalletButtonsStyles } from './useNoConnectedWalletButtonsStyles';

export interface INoConnectedWalletButtonProps {
  isWalletAccountConnecting: boolean;
  onCancelButtonClick: () => void;
  onConnectButtonClick: () => void;
}

export const NoConnectedWalletButtons = ({
  isWalletAccountConnecting: isConnecting,
  onCancelButtonClick,
  onConnectButtonClick,
}: INoConnectedWalletButtonProps) => {
  const { classes } = useNoConnectedWalletButtonsStyles();

  return (
    <div className={classes.root}>
      <PrimaryButton isLoading={isConnecting} onClick={onConnectButtonClick}>
        {t('account.payment-summary-dialog.crypto.connect-button')}
      </PrimaryButton>
      <SecondaryButton onClick={onCancelButtonClick}>
        {t('account.payment-summary-dialog.cancel-button')}
      </SecondaryButton>
    </div>
  );
};
