import { t } from '@ankr.com/common';

import { PrimaryButton } from 'modules/payments/components/PrimaryButton';
import { SecondaryButton } from 'modules/payments/components/SecondaryButton';

import { useConnectedWalletButtonStyles } from './useConnectedWalletButtonsStyles';

export interface IConnectedWalletButtonsProps {
  isAccountChangedOnDepositStep: boolean;
  onAnotherAddressButtonClick: () => void;
  onCancelButtonClick: () => void;
  onConfirmButtonClick: () => void;
}

const confirmKey = 'account.payment-summary-dialog.crypto.confirm-button';
const proceedKey =
  'account.payment-summary-dialog.crypto.proceed-with-new-address-button';

export const ConnectedWalletButtons = ({
  isAccountChangedOnDepositStep,
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
        {t(isAccountChangedOnDepositStep ? proceedKey : confirmKey)}
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
