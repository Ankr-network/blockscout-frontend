import { t } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';

import { Buttons } from './components/Buttons';
import { Header } from './components/Header';
import { ICryptoPaymentDepositDialogProps } from './types';
import { PaymentDetails } from './components/PaymentDetails';
import { Stepper } from './components/Stepper';
import { SwitchNetworkBanner } from './components/SwitchNetworkBanner';
import { useCryptoPaymentDepositDialogStyles } from './useCryptoPaymentDepositDialogStyles';

export const CryptoPaymentDepositDialog = ({
  activeStep,
  allowance,
  allowanceError,
  allowanceFeeDetails,
  allowanceStepStatus,
  amount,
  amountUsd,
  completedStep,
  currency,
  depositError,
  depositFeeDetails,
  depositStepStatus,
  erroredStep,
  isAllowanceLoading,
  isAllowanceSent,
  isPending,
  isWrongNetwork,
  network,
  onCheckAllowanceButtonClick,
  onConfirmButtonClick,
  onDiscardButtonClick,
  shouldRevokeAllowance,
  status,
  ...dialogProps
}: ICryptoPaymentDepositDialogProps) => {
  const { classes } = useCryptoPaymentDepositDialogStyles();

  const isDepositPending =
    activeStep === ECryptoDepositStep.Deposit &&
    depositStepStatus === ECryptoDepositStepStatus.Pending;

  return (
    <Dialog
      {...dialogProps}
      classes={classes}
      title={t('account.crypto-payment-deposit-dialog.title')}
      titleClassName={classes.title}
    >
      <Header
        amount={amount}
        amountUsd={amountUsd}
        currency={currency}
        network={network}
      />
      <Stepper
        activeStep={activeStep}
        className={classes.stepper}
        completedStep={completedStep}
        erroredStep={erroredStep}
      />
      <PaymentDetails
        allowance={allowance}
        allowanceError={allowanceError}
        allowanceFeeDetails={allowanceFeeDetails}
        allowanceStepStatus={allowanceStepStatus}
        amount={amount}
        className={classes.paymentDetails}
        currency={currency}
        depositError={depositError}
        depositFeeDetails={depositFeeDetails}
        depositStepStatus={depositStepStatus}
        isAllowanceLoading={isAllowanceLoading}
        isAllowanceSent={isAllowanceSent}
        isDepositPending={isDepositPending}
        network={network}
      />
      {isWrongNetwork && <SwitchNetworkBanner network={network} />}
      <Buttons
        activeStep={activeStep}
        isPending={isPending}
        isRevokeAllowanceLoading={isAllowanceLoading}
        isWrongNetwork={isWrongNetwork}
        onCheckAllowanceButtonClick={onCheckAllowanceButtonClick}
        onConfirmButtonClick={onConfirmButtonClick}
        onDiscardButtonClick={onDiscardButtonClick}
        shouldRevokeAllowance={shouldRevokeAllowance}
        status={status}
      />
    </Dialog>
  );
};
