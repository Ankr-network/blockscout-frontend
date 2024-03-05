import { t } from '@ankr.com/common';

import { Dialog, IDialogProps } from 'uiKit/Dialog';
import { IFeeDetails } from 'modules/billing/types';

import { ButtonsGroup, IButtonsGroupProps } from './components/ButtonsGroup';
import { IUseCryptoPaymentSummaryDialogProps } from './types';
import { TxDetails } from './components/TxDetails';
import { useCryptoPaymentSummaryDialogStyles } from './useCryptoPaymentSummaryDialogStyles';

export interface ICryptoPaymentSummaryDialogProps
  extends IUseCryptoPaymentSummaryDialogProps,
    IButtonsGroupProps,
    IDialogProps {
  approvalFeeDetails: IFeeDetails;
  depositFeeDetails: IFeeDetails;
}

export const CryptoPaymentSummaryDialog = ({
  amount,
  approvalFeeDetails,
  connectedAddress,
  currency,
  depositFeeDetails,
  network,
  onAnotherAddressButtonClick,
  onCancelButtonClick,
  onConfirmButtonClick,
  onConnectButtonClick,
  walletIcon,
  ...dialogProps
}: ICryptoPaymentSummaryDialogProps) => {
  const { classes } = useCryptoPaymentSummaryDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      title={t('account.payment-summary-dialog.title')}
    >
      <TxDetails
        amount={amount}
        approvalFeeDetails={approvalFeeDetails}
        className={classes.txDetails}
        currency={currency}
        depositFeeDetails={depositFeeDetails}
        network={network}
      />
      <ButtonsGroup
        connectedAddress={connectedAddress}
        onAnotherAddressButtonClick={onAnotherAddressButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onConfirmButtonClick={onConfirmButtonClick}
        onConnectButtonClick={onConnectButtonClick}
        walletIcon={walletIcon}
      />
    </Dialog>
  );
};
