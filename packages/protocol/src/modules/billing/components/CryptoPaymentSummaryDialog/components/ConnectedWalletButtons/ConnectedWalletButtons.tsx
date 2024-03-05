import { t } from '@ankr.com/common';

import { PrimaryButton } from '../PrimaryButton';
import { SecondaryButton } from '../SecondaryButton';
import { useConnectedWalletButtonStyles } from './useConnectedWalletButtonsStyles';

export interface IConnectedWalletButtonsProps {
  onAnotherAddressButtonClick: () => void;
  onCancelButtonClick: () => void;
  onConfirmButtonClick: () => void;
}

export const ConnectedWalletButtons = ({
  onAnotherAddressButtonClick,
  onCancelButtonClick,
  onConfirmButtonClick,
}: IConnectedWalletButtonsProps) => {
  const { classes } = useConnectedWalletButtonStyles();

  return (
    <div className={classes.root}>
      <PrimaryButton
        className={classes.confirmButton}
        onClick={onConfirmButtonClick}
      >
        {t('account.payment-summary-dialog.crypto.confirm-button')}
      </PrimaryButton>
      <SecondaryButton
        className={classes.anotherAddressButton}
        onClick={onAnotherAddressButtonClick}
      >
        {t('account.payment-summary-dialog.crypto.another-address-button')}
      </SecondaryButton>
      <SecondaryButton
        className={classes.cancelButton}
        onClick={onCancelButtonClick}
      >
        {t('account.payment-summary-dialog.cancel-button')}
      </SecondaryButton>
    </div>
  );
};
