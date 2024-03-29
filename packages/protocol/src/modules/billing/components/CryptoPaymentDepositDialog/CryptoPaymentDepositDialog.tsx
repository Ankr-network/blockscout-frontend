import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';

import { Buttons } from './components/Buttons';
import { Header } from './components/Header';
import { ICryptoPaymentDepositDialogProps } from './types';
import { PaymentDetails } from './components/PaymentDetails';
import { Stepper } from './components/Stepper';
import { useCryptoPaymentDepositDialogStyles } from './useCryptoPaymentDepositDialogStyles';

export const CryptoPaymentDepositDialog = ({
  amount,
  amountUsd,
  currency,
  network,

  /* IPaymentDetailsProps */
  approvedAmount,
  approvalFeeDetails,
  approvalStatus,
  approvalError,
  depositFeeDetails,
  depositStatus,
  depositError,

  /* IButtonsProps */
  activeStep,
  isPending,
  onConfirmButtonClick,
  onDiscardButtonClick,
  status,

  /* IStepperProps */
  completedStep,
  erroredStep,

  ...dialogProps
}: ICryptoPaymentDepositDialogProps) => {
  const { classes } = useCryptoPaymentDepositDialogStyles();

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      title={t('account.crypto-payment-deposit-dialog.title')}
      titleClassName={classes.title}
      hasMinimizeIcon
    >
      <Header amount={amount} amountUsd={amountUsd} currency={currency} />
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        completedStep={completedStep}
        erroredStep={erroredStep}
      />
      <PaymentDetails
        approvedAmount={approvedAmount}
        amount={amount}
        approvalFeeDetails={approvalFeeDetails}
        approvalStatus={approvalStatus}
        approvalError={approvalError}
        className={classes.paymentDetails}
        currency={currency}
        depositError={depositError}
        depositFeeDetails={depositFeeDetails}
        depositStatus={depositStatus}
        network={network}
      />
      <Buttons
        activeStep={activeStep}
        isPending={isPending}
        onConfirmButtonClick={onConfirmButtonClick}
        onDiscardButtonClick={onDiscardButtonClick}
        status={status}
      />
    </Dialog>
  );
};
